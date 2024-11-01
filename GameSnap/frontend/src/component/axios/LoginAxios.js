import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:1111/',
});

export const login = async (email, password) => {
  return await apiClient.post('/login', { email, password });
};
