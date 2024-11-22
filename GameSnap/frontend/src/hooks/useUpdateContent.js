// hooks/useUpdateContent.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useUpdateContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateContent'],
    mutationFn: async (content) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:1111//Profile/content', 
          { content }, 
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        return response.data;
      } catch (error) {
        console.error('Error updating content:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
};