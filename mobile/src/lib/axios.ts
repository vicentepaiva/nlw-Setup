import axios from 'axios';


export const api = axios.create({
    baseURL: 'http://192.168.40.150:3333'
});