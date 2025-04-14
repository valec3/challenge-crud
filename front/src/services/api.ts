import axios from 'axios';

const api = axios.create({
    baseURL: 'https://back-fire.onrender.com/api'
});

export default api;