<template>
  <div class="row justify-content-center">
    <div class="col-12 col-lg-8">
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h1 class="h4 mb-0">Editar Receita</h1>
        <RouterLink :to="{ name: 'receita-detalhe', params: { id } }" class="btn btn-outline-secondary btn-sm">Voltar</RouterLink>
      </div>

      <div v-if="loading" class="text-muted">Carregando...</div>
      <div v-else>
        <div v-if="success" class="alert alert-success">Receita atualizada com sucesso!</div>
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

          <button class="btn btn-success mt-3" :disabled="saving">
            {{ saving ? 'Salvando...' : 'Salvar alterações' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const id = route.params.id

const categorias = ref([])
const nome = ref('')
const porcoes = ref(null)
const tempoPreparoMinutos = ref(null)
const idCategorias = ref(null)
const ingredientes = ref('')
const modoPreparo = ref('')

const loading = ref(true)
const saving = ref(false)
const error = ref(null)
const success = ref(false)

onMounted(async () => {
  try {
    const [{ data: r }, { data: cats }] = await Promise.all([
      api.get(`/receitas/${id}`),
      api.get('/categorias').catch(() => ({ data: [] })),
    ])
    nome.value = r.nome || ''
    porcoes.value = r.porcoes ?? null
    tempoPreparoMinutos.value = r.tempoPreparoMinutos ?? null
    idCategorias.value = r.idCategorias ?? null
    ingredientes.value = r.ingredientes || ''
    modoPreparo.value = r.modoPreparo || ''
    categorias.value = cats
  } catch (e) {
    error.value = e?.response?.data?.erro || 'Erro ao carregar receita'
  } finally {
    loading.value = false
  }
})

async function onSubmit() {
  saving.value = true
  error.value = null
  success.value = false
  try {
    await api.put(`/receitas/${id}`, {
      nome: nome.value || null,
      porcoes: porcoes.value || null,
      tempoPreparoMinutos: tempoPreparoMinutos.value || null,
      idCategorias: idCategorias.value,
      ingredientes: ingredientes.value || null,
      modoPreparo: modoPreparo.value,
    })
    success.value = true
  } catch (e) {
    error.value = e?.response?.data?.erro || 'Erro ao salvar alterações'
  } finally {
    saving.value = false
  }
}
</script>
