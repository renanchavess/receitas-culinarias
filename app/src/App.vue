<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <main class="container-xxl py-4">
    <router-view />
  </main>
</template>

<style>
/* estilos globais simples */
body { background: #f8f9fa; }
</style>
