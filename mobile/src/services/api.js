import axios from 'axios';

const api = axios.create({
    baseURL: 'https://betheehero.herokuapp.com/'
});

export default api;