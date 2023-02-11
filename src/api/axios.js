import axios from 'axios';

const BASE_URL = 'http://localhost:3500';

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