<template>
    <div>
        <TransitionGroup name="list" tag="ul" class="todo-list">
            <li v-for="todo in sortedTodos" :key="todo.id" class="todo-item"
                :class="{ 'completed-item': todo.completed }">
                <div class="todo-content">
                    <span class="todo-text" :class="{ 'completed': todo.completed }">{{ todo.text }}</span>
                    <div class="todo-actions justify-content-end">
                        <button @click="toggleComplete(todo.id)" class="btn btn-action btn-toggle"
                            :class="{ 'completed-btn': todo.completed }">
                            {{ todo.completed ? 'Batal' : 'Selesai' }}
                        </button>
                        <button @click="deleteTodo(todo.id)" class="btn btn-action btn-delete">
                            Hapus
                        </button>
                    </div>
                </div>
            </li>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '~/stores/todo'
import type { Todo } from '~/types'
import { computed, onMounted } from 'vue'

const todoStore = useTodoStore()
const todos = computed(() => todoStore.todos)

const sortedTodos = computed(() => {
    return [...todos.value].sort((a, b) => {
        if (a.completed === b.completed) return 0
        return a.completed ? 1 : -1
    })
})

const toggleComplete = (id: number) => {
    todoStore.toggleComplete(id)
}

const deleteTodo = (id: number) => {
    todoStore.deleteTodo(id)
}

// Fetch todos when the component is mounted
onMounted(() => {
    todoStore.fetchTodos()
    todoStore.subscribeToTodos()
})
</script>

<style scoped>
.todo-list {
    list-style-type: none;
    padding: 0;
}

.todo-item {
    margin-bottom: 0.75rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
}

.completed-item {
    opacity: 0.7;
    transform: translateY(10px);
}

.todo-content {
    padding: 1rem;
}

.todo-text {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    line-height: 1.4;
    transition: all 0.3s ease;
}

.completed {
    text-decoration: line-through;
    color: #888;
}

.todo-actions {
    display: flex;
    gap: 0.5rem;
}

.btn-action {
    padding: 0.35rem 0.75rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.3s ease;
}

.btn-action:active {
    transform: scale(0.98);
}

.btn-toggle {
    background-color: var(--primary-color);
    color: white;
}

.btn-toggle:hover {
    background-color: darken(var(--primary-color), 40%);
    color: black;
    box-shadow: 0 0 5px rgba(0, 128, 0, 0.5);
}

.completed-btn {
    background-color: #6c757d;
}

.btn-delete {
    background-color: #dc3545;
    color: white;
}

.btn-delete:hover {
    background-color: darken(#dc3545, 40%);
}

/* Transition group animations */
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.list-leave-active {
    position: absolute;
}

@media (max-width: 768px) {
    .todo-item {
        margin-bottom: 0.5rem;
    }

    .todo-content {
        padding: 0.75rem;
    }

    .todo-text {
        font-size: 0.95rem;
        margin-bottom: 0.75rem;
    }

    .todo-actions {
        justify-content: flex-end;
    }

    .btn-action {
        padding: 0.3rem 0.6rem;
        font-size: 0.8rem;
    }
}
</style>
