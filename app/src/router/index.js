import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded views
const Login = () => import('../views/Login.vue')
const CadastroUsuario = () => import('../views/CadastroUsuario.vue')
const ReceitaListar = () => import('../views/ReceitaListar.vue')
const ReceitaCadastro = () => import('../views/ReceitaCadastro.vue')
const ReceitaDetalhes = () => import('../views/ReceitaDetalhes.vue')
const ReceitaEditar = () => import('../views/ReceitaEditar.vue')

const routes = [
  { path: '/', redirect: '/receitas' },
  { path: '/entrar', name: 'entrar', component: Login, meta: { public: true } },
  { path: '/cadastrar', name: 'cadastrar', component: CadastroUsuario, meta: { public: true } },
  { path: '/receitas', name: 'receitas', component: ReceitaListar, meta: { requiresAuth: true } },
  { path: '/receitas/novo', name: 'receita-nova', component: ReceitaCadastro, meta: { requiresAuth: true } },
  { path: '/receitas/:id', name: 'receita-detalhe', component: ReceitaDetalhes, meta: { requiresAuth: true } },
  { path: '/receitas/:id/editar', name: 'receita-editar', component: ReceitaEditar, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const isPublic = to.matched.some((record) => record.meta.public)
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const token = localStorage.getItem('token')

  if (requiresAuth && !token) {
    return next({ name: 'entrar', query: { redirect: to.fullPath } })
  }
  
  return next()
})

export default router
