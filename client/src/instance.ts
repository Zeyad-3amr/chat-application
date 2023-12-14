import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://chatify-com.onrender.com/api/chat-application',
  // baseURL: 'http://localhost:8000/api/chat-application',
  withCredentials: true,
});

export default instance;
