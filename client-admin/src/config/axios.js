import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://lit-cliffs-70178.herokuapp.com'
    // baseURL: 'http://localhost:3000'
});

export default instance