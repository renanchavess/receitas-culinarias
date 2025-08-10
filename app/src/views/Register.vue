<template>
  <div class="row justify-content-center">
    <div class="col-12 col-md-6 col-lg-5">
      <h1 class="h4 mb-3">Criar conta</h1>
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label class="form-label">Nome</label>
          <input v-model="nome" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Login</label>
          <input v-model="login" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Senha</label>
          <input v-model="senha" type="password" class="form-control" required />
        </div>
        <button class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
        </button>
        <p v-if="error" class="text-danger mt-3">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const nome = ref('')
const login = ref('')
const senha = ref('')
const loading = ref(false)
const error = ref(null)

const router = useRouter()
const auth = useAuthStore()

async function onSubmit() {
  loading.value = true
  error.value = null
  try {
    await auth.register({ nome: nome.value, login: login.value, senha: senha.value })
    router.push({ name: 'login' })
  } catch (e) {
    error.value = e?.response?.data?.erro || 'Falha no cadastro'
  } finally {
    loading.value = false
  }
}
</script>
