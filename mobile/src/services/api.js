import axios from 'axios';

const api = axios.create({
    baseURL: 'https://https://betheehero.herokuapp.com/'
});

export default api;