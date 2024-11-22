// hooks/useUpdateName.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useUpdateName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateName'],
    mutationFn: async (name) => {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:1111/유저이름변경엔드포인트', 
        { name },
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