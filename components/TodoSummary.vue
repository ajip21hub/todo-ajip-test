<template>
    <div>
        <button class="btn btn-primary mt-2" @click="getSummary" :disabled="loading">Simpulkan Task Saya dengan AI </button>
        <div v-if="loading">Loading...</div>
        <div v-if="summary" class="summary">
            <h3>AI Summary and Ideas:</h3>
            <div class="summary-content" v-html="parsedSummary"></div>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked'

const summary = ref('')
const loading = ref(false)
const error = ref('')

const parsedSummary = computed(() => {
    return marked(summary.value)
})

async function getSummary() {
    loading.value = true
    error.value = ''
    try {
        const response = await fetch('/api/summarize-todos', {
            method: 'POST'
        })
        const data = await response.json()
        if (data.error) {
            throw new Error(data.error)
        }
        summary.value = data.summary
    } catch (e) {
        error.value = e.message
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.summary {
    margin-top: 20px;
}

.summary-content {
    max-height: 300px;
    overflow-y: auto;
    padding: 15px;
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 5px;
    font-size: 16px;
    line-height: 1.6;
    word-wrap: break-word;
}

.summary-content :deep(p) {
    margin-bottom: 10px;
}

.summary-content :deep(ul),
.summary-content :deep(ol) {
    margin-bottom: 10px;
    padding-left: 20px;
}

.summary-content :deep(h1),
.summary-content :deep(h2),
.summary-content :deep(h3),
.summary-content :deep(h4),
.summary-content :deep(h5),
.summary-content :deep(h6) {
    margin-top: 15px;
    margin-bottom: 10px;
}

.summary-content :deep(code) {
    background-color: #e9ecef;
    padding: 2px 4px;
    border-radius: 3px;
}

.summary-content :deep(pre) {
    background-color: #e9ecef;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>
