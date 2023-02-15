import axios from 'axios';

const BASE_URL = 'backend-login-project.vercel.app';

export default axios.create({
  baseURL: BASE_URL, //connect to backend
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL, //connect to backend
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});