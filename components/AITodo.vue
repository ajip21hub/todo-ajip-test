<template>
    <div class="my-3">
        <textarea v-model="userPrompt" class="form-control"
            placeholder="Deskripsi tugas yang ingin Anda buat, AI akan membantu anda untuk membuatkan list todo yang bisa anda pilih"></textarea>
        <button class="btn btn-success mt-2" @click="generateTasks">
            Generate To-Do List Dengan AI
        </button>
        <div v-if="loading" class="mt-2">Sedang memuat...</div>

        <!-- Tampilkan daftar tugas yang dihasilkan -->
        <div v-if="generatedTasks.length > 0" class="mt-3">
            <h5>Pilih tugas yang ingin ditambahkan:</h5>
            <ul class="list-group">
                <li v-for="(task, index) in generatedTasks" :key="index" class="list-group-item">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" :id="'task-' + index" v-model="task.selected" />
                        <label class="form-check-label" :for="'task-' + index">
                            {{ task.text }}
                        </label>
                    </div>
                </li>
            </ul>
            <button class="btn btn-primary mt-2" @click="addSelectedTasks">
                Tambahkan Tugas Terpilih
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '~/stores/todo'

const userPrompt = ref('')
const loading = ref(false)
const todoStore = useTodoStore()

interface GeneratedTask {
    text: string
    selected: boolean
}

const generatedTasks = ref<GeneratedTask[]>([])

const generateTasks = async () => {
    if (userPrompt.value.trim()) {
        loading.value = true
        try {
            const response = await $fetch('/api/generate-todos', {
                method: 'POST',
                body: { prompt: userPrompt.value },
            })
            const tasks: string[] = response.tasks
            generatedTasks.value = tasks.map((text) => ({ text, selected: false }))
            userPrompt.value = ''
        } catch (error) {
            console.error('Error generating tasks:', error)
        } finally {
            loading.value = false
        }
    }
}

const addSelectedTasks = async () => {
    const selectedTasks = generatedTasks.value
        .filter((task) => task.selected)
        .map((task) => task.text)

    if (selectedTasks.length > 0) {
        await todoStore.addTodosFromAI(selectedTasks)
        generatedTasks.value = []
    } else {
        alert('Pilih setidaknya satu tugas untuk ditambahkan.')
    }
}
</script>