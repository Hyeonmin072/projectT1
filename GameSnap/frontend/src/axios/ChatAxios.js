import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:1123'
});

export const Enterprivate = async () => {
  try{
    return await apiClient.get();
  } catch {
    return null;
  }
};