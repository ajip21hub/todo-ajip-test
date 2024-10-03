<template>
    <div class="my-3">
        <input v-model="newTodoText" class="form-control" placeholder="Tambahkan tugas baru" @keyup.enter="addTodo" />
        <button class="btn btn-primary mt-2" @click="addTodo">Tambah Tugas</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '~/stores/todo'

const todoStore = useTodoStore()
const newTodoText = ref('')

const addTodo = async () => {
    if (newTodoText.value.trim()) {
        await todoStore.addTodo(newTodoText.value.trim())
        newTodoText.value = '' // Clear the input after adding
    }
}

// Use computed to make it reactive
const todos = computed(() => todoStore.todos)

// Fetch todos when the component is mounted
onMounted(() => {
    todoStore.fetchTodos()
})
</script>