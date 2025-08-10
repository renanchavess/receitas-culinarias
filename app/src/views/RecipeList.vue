<template>
  <div>
    <h1 class="h4 mb-3">Receitas</h1>

    <div v-if="loading">Carregando...</div>
    <div v-else-if="error" class="text-danger">{{ error }}</div>

    <div v-else class="row g-3">
      <div class="col-md-4" v-for="r in receitas" :key="r.id">
        <div class="card h-100 position-relative recipe-card">
          <div class="card-body">
            <h2 class="h5 card-title mb-1">{{ r.nome }}</h2>
            <p class="card-text text-muted mb-3">
              <span v-if="r.porcoes">Porções: {{ r.porcoes }}</span>
              <span v-if="r.tempoPreparoMinutos" class="ms-2">Tempo: {{ r.tempoPreparoMinutos }} min</span>
            </p>
            <div class="d-flex gap-2 justify-content-end">
              <RouterLink :to="{ name: 'receita-detalhe', params: { id: r.id } }" class="btn btn-sm btn-primary">
                Ver detalhes
              </RouterLink>
              <button type="button" class="btn btn-sm btn-outline-secondary" @click="onEdit(r.id)">Editar</button>
              <button type="button" class="btn btn-sm btn-outline-danger" @click="onDelete(r)">Apagar</button>
            </div>
          </div>
        </div>
      </div>
      <p v-if="!receitas.length">Nenhuma receita encontrada.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const receitas = ref([])
const loading = ref(true)
const error = ref(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    const { data } = await api.get('/receitas')
    receitas.value = data
  } catch (e) {
    error.value = e?.response?.data?.erro || 'Erro ao carregar receitas'
  } finally {
    loading.value = false
  }
}

onMounted(load)

function onEdit(id) {
  router.push({ name: 'receita-editar', params: { id } })
}

async function onDelete(r) {
  const ok = window.confirm(`Apagar a receita "${r.nome}"?`)
  if (!ok) return
  try {
    await api.delete(`/receitas/${r.id}`)
    receitas.value = receitas.value.filter((x) => x.id !== r.id)
  } catch (e) {
    alert(e?.response?.data?.erro || 'Erro ao apagar receita')
  }
}
</script>

<style scoped>
.recipe-card { transition: transform .12s ease, box-shadow .12s ease; }
.recipe-card:hover { transform: translateY(-2px); box-shadow: 0 .5rem 1rem rgba(0,0,0,.15); }
</style>
