import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://3.37.183.85:1111 '
});

export const Enterprivate = async () => {
  try{
    return await apiClient.get();
  } catch {
    return null;
  }
};