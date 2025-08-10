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
      await api.post('/usuarios', { nome, login, senha })
    },
    async logout() {
      try { await api.post('/logout') } catch { /* ignore */ }
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
