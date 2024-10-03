import { defineStore } from "pinia";
import { useNuxtApp } from "#app";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as any[],
  }),
  actions: {
    async fetchTodos() {
      const { data: todos, error } = await useNuxtApp()
        .$supabase.from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching todos:", error);
      else this.todos = todos;
    },
    async addTodo(text: string) {
      const { data, error } = await useNuxtApp()
        .$supabase.from("todos")
        .insert([{ text, completed: false }])
        .select();

      if (error) {
        console.error("Error adding todo:", error);
      } else if (data && data.length > 0) {
        // Add the new todo to the beginning of the array
        this.todos.unshift(data[0]);
      } else {
        console.warn("Todo added, but no data returned");
        // Optionally, fetch all todos to ensure the state is up-to-date
        await this.fetchTodos();
      }
    },

    async toggleComplete(id: number) {
      const todo = this.todos.find((t) => t.id === id);
      if (!todo) return;

      const { error } = await useNuxtApp()
        .$supabase.from("todos")
        .update({ completed: !todo.completed })
        .eq("id", id);

      if (error) console.error("Error toggling todo:", error);
      else todo.completed = !todo.completed;
    },
    async deleteTodo(id: number) {
      const { error } = await useNuxtApp()
        .$supabase.from("todos")
        .delete()
        .eq("id", id);

      if (error) console.error("Error deleting todo:", error);
      else this.todos = this.todos.filter((t) => t.id !== id);
    },
    async addTodosFromAI(tasks: string[]) {
      const newTodos = tasks.map((text) => ({ text, completed: false }));
      const { data, error } = await useNuxtApp()
        .$supabase.from("todos")
        .insert(newTodos)
        .select();

      if (error) {
        console.error("Error adding AI todos:", error);
      } else if (data) {
        this.todos.unshift(...data);
      } else {
        console.warn("No data returned from insert operation");
        // Optionally, you can fetch all todos again to ensure the state is up-to-date
        await this.fetchTodos();
      }
    },

    subscribeToTodos() {
      useNuxtApp()
        .$supabase.channel("todos")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "todos" },
          (payload) => {
            switch (payload.eventType) {
              case "INSERT":
                this.todos.unshift(payload.new);
                break;
              case "UPDATE":
                const index = this.todos.findIndex(
                  (t) => t.id === payload.new.id
                );
                if (index !== -1) this.todos[index] = payload.new;
                break;
              case "DELETE":
                this.todos = this.todos.filter((t) => t.id !== payload.old.id);
                break;
            }
          }
        )
        .subscribe();
    },
  },
});
