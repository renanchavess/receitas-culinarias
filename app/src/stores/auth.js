import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: (typeof localStorage !== 'undefined' && localStorage.getItem('token')) || null,
  }),
  getters: {
    isAuthenticated: (s) => !!s.token,
  },
  actions: {
    async login({ login, senha }) {
      const { data } = await api.post('/login', { login, senha })
      this.token = data.token
      localStorage.setItem('token', data.token)
    },
    async register({ nome, login, senha }) {
      console.log('Auth store: Enviando requisição de registro...')
      try {
        const response = await api.post('/usuarios', { nome, login, senha })
        console.log('Auth store: Resposta recebida:', response.status, response.data)
        return response
      } catch (error) {
        console.error('Auth store: Erro na requisição:', error)
        throw error
      }
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
