import axios from 'axios';

const api = axios.create({
      baseURL: 'https://betheehero.herokuapp.com/'
      // baseURL: 'http://localhost:8080/'
});

export default api;