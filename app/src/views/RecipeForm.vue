<template>
  <div class="row justify-content-center">
    <div class="col-12 col-lg-8">
      <h1 class="h4 mb-3">Nova Receita</h1>

      <div v-if="success" class="alert alert-success">Receita criada com sucesso!</div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <form @submit.prevent="onSubmit">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Nome</label>
            <input v-model="nome" type="text" class="form-control" />
          </div>
          <div class="col-md-3">
            <label class="form-label">Porções</label>
            <input v-model.number="porcoes" type="number" min="1" class="form-control" />
          </div>
          <div class="col-md-3">
            <label class="form-label">Tempo (min)</label>
            <input v-model.number="tempoPreparoMinutos" type="number" min="1" class="form-control" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Categoria</label>
            <select v-model="idCategorias" class="form-select">
              <option :value="null">Sem categoria</option>
              <option v-for="c in categorias" :key="c.id" :value="c.id">{{ c.nome }}</option>
            </select>
          </div>
          <div class="col-12">
            <label class="form-label">Ingredientes</label>
            <textarea v-model="ingredientes" class="form-control" rows="3"></textarea>
          </div>
          <div class="col-12">
            <label class="form-label">Modo de preparo <span class="text-danger">*</span></label>
            <textarea v-model="modoPreparo" class="form-control" rows="5" required></textarea>
          </div>
        </div>

        <button class="btn btn-success mt-3" :disabled="loading">
          {{ loading ? 'Salvando...' : 'Salvar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const categorias = ref([])
const nome = ref('')
const porcoes = ref(null)
const tempoPreparoMinutos = ref(null)
const idCategorias = ref(null)
const ingredientes = ref('')
const modoPreparo = ref('')

const loading = ref(false)
const error = ref(null)
const success = ref(false)

onMounted(async () => {
  try {
    const { data } = await api.get('/categorias')
    categorias.value = data
  } catch (e) {
    // silencioso; usuário ainda pode cadastrar sem categoria
  }
})

async function onSubmit() {
  loading.value = true
  error.value = null
  success.value = false
  try {
    await api.post('/receitas', {
      nome: nome.value || null,
      porcoes: porcoes.value || null,
      tempoPreparoMinutos: tempoPreparoMinutos.value || null,
      idCategorias: idCategorias.value,
      ingredientes: ingredientes.value || null,
      modoPreparo: modoPreparo.value,
    })
    success.value = true
    nome.value = ''
    porcoes.value = null
    tempoPreparoMinutos.value = null
    idCategorias.value = null
    ingredientes.value = ''
    modoPreparo.value = ''
  } catch (e) {
    error.value = e?.response?.data?.erro || 'Erro ao salvar receita'
  } finally {
    loading.value = false
  }
}
</script>
