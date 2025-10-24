import axios from 'axios'

const baseURL = import.meta.env.DEV
  ? '/api'
  : `${import.meta.env.VITE_BACKEND_URL}/api`

const clienteAxios = axios.create({
  baseURL
})

// Inyecta el token en cada request si existe
clienteAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Maneja 401 de forma centralizada
clienteAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401) {
      localStorage.removeItem('token')
      // Redirige a login en caso de sesión inválida
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  }
)

export default clienteAxios
