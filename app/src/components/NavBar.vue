<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/receitas">Receitas</RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="auth.isAuthenticated">
            <RouterLink class="nav-link" to="/receitas">Início</RouterLink>
          </li>
        </ul>

        <div class="d-flex gap-2">
          <template v-if="auth.isAuthenticated">
            <button class="btn btn-outline-light btn-sm" @click="onLogout">Sair</button>
          </template>
          <template v-else>
            <RouterLink class="btn btn-outline-light btn-sm" to="/entrar">Entrar</RouterLink>
            <RouterLink class="btn btn-warning btn-sm" to="/cadastrar">Criar conta</RouterLink>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

function onLogout() {
  auth.logout()
  router.push({ name: 'entrar' })
}
</script>
