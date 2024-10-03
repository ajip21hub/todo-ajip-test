<!-- app.vue -->
<template>
  <div class="app-container">
    <header class="app-header">
      <nav class="navbar">
        <div class="container">
          <a class="navbar-brand" href="/">Aji Todo</a>
          
          <NuxtLink to="/about" class="navbar-link">About</NuxtLink>

        </div>
      </nav>
    </header>
    <main class="app-main container">
      <NuxtPage />
    </main>
    <footer class="app-footer">
      <div class="container">
        &copy; 2024 Code By Aji
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// No additional script needed
</script>

<style>
@import '~/assets/css/main.css';

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar {
  padding: 1rem 0;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.app-main {
  flex: 1;
  padding: 2rem 0;
}

.app-footer {
  background-color: #f8f9fa;
  padding: 1rem 0;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}

@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
