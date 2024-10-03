<template>
    <div class="flex flex-col min-h-screen bg-gray-50">
        <nav class="bg-indigo-600 p-4 shadow-md">
            <div class="container mx-auto">
                <NuxtLink to="/" class="text-white text-2xl font-bold hover:text-indigo-200 transition-colors">Aji Todo
                    App</NuxtLink>
            </div>
        </nav>

        <main class="flex-grow container mx-auto px-4 py-8 md:py-12">
            <h1 class="text-3xl md:text-4xl font-bold text-indigo-600 mb-6">Tentang Aji Todo App</h1>

            <div class="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
                <p class="text-gray-700 mb-4 leading-relaxed">
                    Aji Todo App adalah aplikasi manajemen tugas (Task), dibuat dengan Nuxt.js, terintegrasi
                    dengan
                    Supabase untuk penyimpanan data, dan memanfaatkan OpenAI untuk pembuatan tugas berbasis kecerdasan
                    buatan dan autogenerate ide task.
                </p>
            </div>

            <h2 class="text-2xl md:text-3xl font-semibold text-indigo-600 mb-4">Fitur Utama</h2>
            <div class="bg-white rounded-lg shadow-md p-6 md:p-8">
                <ul class="list-group">
                    <li class="list-group-item">Manajemen Tugas Lengkap: Tambah, edit, hapus, dan tandai tugas sebagai
                        selesai</li>
                    <li class="list-group-item">Pembuatan Tugas dengan AI: Buat daftar tugas secara otomatis menggunakan
                        OpenAI</li>
                    <li class="list-group-item">Ringkasan Tugas: Lihat statistik dan ikhtisar tugas Anda</li>
                    <li class="list-group-item">Desain Responsif: Pengalaman yang mulus di berbagai perangkat</li>
                    <li class="list-group-item">Manajemen State: Menggunakan Pinia untuk penanganan state</li>
                    <li class="list-group-item">API Sisi Server: Mengimplementasikan operasi CRUD dan integrasi OpenAI
                    </li>
                </ul>
            </div>
        </main>

        <footer class="bg-indigo-600 text-white p-6">
            <div class="container mx-auto text-center">
                <p>&copy; {{ new Date().getFullYear() }} Aji Todo App. All rights reserved.</p>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
// You can add application-wide logic here
</script>

<style>
body {
    font-family: 'Inter', sans-serif;
}

.list-group {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    border-radius: 0.25rem;
}

.list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
}

.list-group-item:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}

.list-group-item:last-child {
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: inherit;
}

.list-group-item+.list-group-item {
    border-top-width: 0;
}

.list-group-item:hover {
    z-index: 1;
    background-color: #f8f9fa;
}
</style>
