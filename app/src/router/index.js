import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded views
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const RecipeList = () => import('../views/RecipeList.vue')
const RecipeForm = () => import('../views/RecipeForm.vue')
const RecipeDetails = () => import('../views/RecipeDetails.vue')
const RecipeEdit = () => import('../views/RecipeEdit.vue')

const routes = [
  { path: '/', redirect: '/receitas' },
  { path: '/entrar', name: 'entrar', component: Login, meta: { public: true } },
  { path: '/cadastrar', name: 'cadastrar', component: Register, meta: { public: true } },
  { path: '/receitas', name: 'receitas', component: RecipeList, meta: { requiresAuth: true } },
  { path: '/receitas/novo', name: 'receita-nova', component: RecipeForm, meta: { requiresAuth: true } },
  { path: '/receitas/:id', name: 'receita-detalhe', component: RecipeDetails, meta: { requiresAuth: true } },
  { path: '/receitas/:id/editar', name: 'receita-editar', component: RecipeEdit, meta: { requiresAuth: true } },
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
  if (isPublic && token && (to.name === 'entrar' || to.name === 'cadastrar')) {
    return next({ name: 'receitas' })
  }
  return next()
})

export default router
