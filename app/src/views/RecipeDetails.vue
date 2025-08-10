<template>
  <div class="row justify-content-center">
    <div class="col-12 col-lg-8">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h1 class="h4 mb-0">Detalhes da Receita</h1>
        <RouterLink to="/receitas" class="btn btn-outline-secondary btn-sm">Voltar</RouterLink>
      </div>

      <div v-if="loading" class="text-muted">Carregando...</div>
      <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

      <div v-else class="card">
        <div class="card-body">
          <h2 class="h5">{{ receita.nome || 'Sem título' }}</h2>
          <p class="mb-2 text-muted">
            <span v-if="receita.porcoes">Porções: {{ receita.porcoes }}</span>
            <span v-if="receita.tempoPreparoMinutos" class="ms-3">Tempo: {{ receita.tempoPreparoMinutos }} min</span>
            <span v-if="categoriaNome" class="ms-3">Categoria: {{ categoriaNome }}</span>
          </p>

          <div v-if="receita.ingredientes" class="mb-3">
            <h3 class="h6">Ingredientes</h3>
            <p class="mb-0" style="white-space: pre-wrap;">{{ receita.ingredientes }}</p>
          </div>

          <div v-if="receita.modoPreparo" class="mb-3">
            <h3 class="h6">Modo de preparo</h3>
            <p class="mb-0" style="white-space: pre-wrap;">{{ receita.modoPreparo }}</p>
          </div>

          <hr />
          <div class="text-muted small">
            <div v-if="receita.criadoEm">Criado em: {{ formatarData(receita.criadoEm) }}</div>
            <div v-if="receita.alteradoEm">Atualizado em: {{ formatarData(receita.alteradoEm) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const id = route.params.id

const receita = ref({})
const categorias = ref([])
const loading = ref(true)
const error = ref(null)

const categoriaNome = computed(() => {
  const idCat = receita.value?.idCategorias
  if (!idCat) return null
  const found = categorias.value.find((c) => c.id === idCat)
  return found?.nome || `Categoria #${idCat}`
})

onMounted(async () => {
  try {
    const [{ data: r }, { data: cats }] = await Promise.all([
      api.get(`/receitas/${id}`),
      api.get('/categorias').catch(() => ({ data: [] })),
    ])
    receita.value = r
    categorias.value = cats
  } catch (e) {
    error.value = e?.response?.data?.erro || 'Erro ao carregar receita'
  } finally {
    loading.value = false
  }
})

function formatarData(d) {
  try {
    const dt = typeof d === 'string' ? new Date(d) : d
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(dt)
  } catch {
    return d
  }
}
</script>
