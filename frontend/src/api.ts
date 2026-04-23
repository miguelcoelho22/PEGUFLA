import axios from 'axios';

// Aqui fica o endereço do servidor Java do Miguel
export const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});