import axios from 'axios';

// Cria a instância do Axios com o endereço do seu backend (Spring Boot)
const api = axios.create({
  // A URL base inclui o /api/v1 para você não ter que digitar isso em todas as telas
  baseURL: 'http://localhost:8080/api/v1', 
});

// Interceptor: Antes de qualquer requisição sair do front-end, ele passa por aqui
api.interceptors.request.use((config) => {
  // Pega o token salvo no navegador (se o usuário já fez login)
  const token = localStorage.getItem('token'); 
  
  // Se tiver token, injeta no cabeçalho de Autorização para o Spring Security aceitar
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;