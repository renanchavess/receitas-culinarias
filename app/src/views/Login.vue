<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-12 col-md-6 col-lg-5 mt-5">
      <div class="card shadow">
        <div class="card-body p-4">
          <h1 class="h4 mb-4 text-center">Bem-vindo de volta</h1>
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label class="form-label">Login <span class="text-danger">*</span></label>
              <input v-model="login" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Senha <span class="text-danger">*</span></label>
              <input v-model="senha" type="password" class="form-control" required />
            </div>
            <button class="btn btn-primary w-100" :disabled="loading">
              {{ loading ? 'Entrando...' : 'Entrar' }}
            </button>
            <p v-if="error" class="text-danger mt-3">{{ error }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const login = ref('')
const senha = ref('')
const loading = ref(false)
const error = ref(null)

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

async function onSubmit() {
  loading.value = true
  error.value = null
  try {
    await auth.login({ login: login.value, senha: senha.value })
    const redirect = route.query.redirect || '/receitas'
    router.replace(redirect)
  } catch (e) {
    error.value = e?.response?.data?.erro || 'Falha no login'
  } finally {
    loading.value = false
  }
}
</script>
