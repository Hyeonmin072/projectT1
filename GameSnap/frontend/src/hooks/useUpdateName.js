// hooks/useUpdateName.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';


export const useUpdateName = () => {
  const queryClient = useQueryClient();
  const { userData } = useAuth();

  return useMutation({
    mutationKey: ['updateName'],
    mutationFn: async (name) => {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:1111/updataName', 
        {   name, 
            userId: userData.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
};