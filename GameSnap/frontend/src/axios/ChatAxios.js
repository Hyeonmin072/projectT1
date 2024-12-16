import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://13.209.226.109:1111'
});

export const Enterprivate = async () => {
  try{
    return await apiClient.get();
  } catch {
    return null;
  }
};

//http://13.209.226.109/