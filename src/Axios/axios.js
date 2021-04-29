import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://task-manager-server-1.herokuapp.com/'
})

export default instance
