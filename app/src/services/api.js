import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('token')
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams({ redirect: window.location.pathname + window.location.search })
        window.location.assign(`/entrar?${params.toString()}`)
      }
    }
    return Promise.reject(err)
  }
)

export default api
