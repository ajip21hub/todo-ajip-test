<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center mb-2 text-indigo-600">Aji Todo App</h1>
        <p class="text-xl text-center mb-8 text-gray-600">Powered by OpenAI</p>
        <TodoSummary />
        <ManualTodo />
        <AITodo />
        <TodoList />

    </div>
</template>

<script setup lang="ts">
import ManualTodo from '~/components/ManualTodo.vue'
import AITodo from '~/components/AITodo.vue'
import TodoList from '~/components/TodoList.vue'
import TodoSummary from '@/components/TodoSummary.vue'

</script>