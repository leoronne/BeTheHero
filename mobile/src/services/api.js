import axios from 'axios';

const api = axios.create({
    baseURL: 'https://betheehero.herokuapp.com/'
    //   baseURL: 'http://192.168.137.82:8080/'
});

export default api;