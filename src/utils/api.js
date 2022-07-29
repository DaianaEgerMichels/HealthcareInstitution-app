import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080'
  //To-Do: Mudar configuração do CORS do backend para utilizar o link abaixo
  //baseURL: 'https://health-system-api.herokuapp.com'
});

export default api;