import axios from 'axios';

const api = axios.create({
  baseURL: 'https://health-system-api.herokuapp.com'
});

export default api;