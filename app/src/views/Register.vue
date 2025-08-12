<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-12 col-md-6 col-lg-5">
      <div class="card shadow mt-5">
        <div class="card-body p-4">
          <h1 class="h4 mb-4 text-center">Criar conta</h1>
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label class="form-label">Nome <span class="text-danger">*</span></label>
              <input v-model="nome" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Login <span class="text-danger">*</span></label>
              <input v-model="login" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Senha <span class="text-danger">*</span></label>
              <input v-model="senha" type="password" class="form-control" required />
            </div>
            <button class="btn btn-primary w-100" :disabled="loading">
              {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
            </button>
            <p v-if="success" class="text-success mt-3">{{ success }}</p>
            <p v-if="error" class="text-danger mt-3">{{ error }}</p>
          </form>
        </div>
      </div>
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
const success = ref(null)

const router = useRouter()
const auth = useAuthStore()

async function onSubmit() {
  loading.value = true
  error.value = null
  success.value = null
  
  try {
    console.log('Tentando registrar usuário...', { nome: nome.value, login: login.value })
    await auth.register({ nome: nome.value, login: login.value, senha: senha.value })
    console.log('Usuário registrado com sucesso!')
    success.value = 'Usuário criado com sucesso! Redirecionando...'
    
    setTimeout(() => {
      router.push({ name: 'entrar' })
    }, 1500)
  } catch (e) {
    console.error('Erro no registro:', e)
    console.error('Response data:', e?.response?.data)
    console.error('Response status:', e?.response?.status)
    error.value = e?.response?.data?.erro || 'Falha no cadastro'
  } finally {
    loading.value = false
  }
}
</script>
