<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h1 class="h4 mb-0">Receitas</h1>
      <RouterLink to="/receitas/novo" class="btn btn-success btn-sm">Nova Receita</RouterLink>
    </div>

    <!-- Filtros de busca -->
    <div class="card mb-3">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Buscar por nome</label>
            <input 
              v-model="filtros.consulta" 
              type="text" 
              class="form-control" 
              placeholder="Digite o nome da receita..."
              @keyup.enter="buscarReceitas"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label">Categoria</label>
            <select v-model="filtros.idCategorias" class="form-select">
              <option value="">Todas as categorias</option>
              <option v-for="c in categorias" :key="c.id" :value="c.id">{{ c.nome }}</option>
            </select>
          </div>
          <div class="col-md-2 d-flex align-items-end">
            <button type="button" class="btn btn-primary w-100" @click="buscarReceitas">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>

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
              <span v-if="getCategoriaLabel(r.idCategorias)" class="ms-2 badge bg-secondary">{{ getCategoriaLabel(r.idCategorias) }}</span>
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
      <div v-if="!receitas.length" class="col-12">
        <div class="text-center text-muted py-4">
          <p v-if="temFiltros">Nenhuma receita encontrada para os filtros aplicados.</p>
          <p v-else>Nenhuma receita cadastrada. <RouterLink to="/receitas/novo" class="text-decoration-none">Criar primeira receita</RouterLink></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()

const receitas = ref([])
const categorias = ref([])
const loading = ref(true)
const error = ref(null)

const filtros = ref({
  consulta: '',
  idCategorias: ''
})

const temFiltros = computed(() => {
  return filtros.value.consulta.trim() !== '' || filtros.value.idCategorias !== ''
})

async function buscarReceitas() {
  loading.value = true
  error.value = null
  try {
    const params = new URLSearchParams()
    
    if (filtros.value.consulta.trim()) {
      params.append('consulta', filtros.value.consulta.trim())
    }
    
    if (filtros.value.idCategorias) {
      params.append('idCategorias', filtros.value.idCategorias)
    }
    
    const queryString = params.toString()
    const url = queryString ? `/receitas?${queryString}` : '/receitas'
    
    const { data } = await api.get(url)
    receitas.value = data
  } catch (e) {
    error.value = e?.response?.data?.erro || 'Erro ao buscar receitas'
  } finally {
    loading.value = false
  }
}

function getCategoriaLabel(idCategorias) {
  if (!idCategorias) return null
  const categoria = categorias.value.find(c => c.id === idCategorias)
  return categoria?.nome || null
}

async function carregarCategorias() {
  try {
    const { data } = await api.get('/categorias')
    categorias.value = data
  } catch (e) {
    // Silencioso - categorias são opcionais para a busca
  }
}

onMounted(async () => {
  await carregarCategorias()
  await buscarReceitas()
})

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
