// hooks/useUpdateGames.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const useUpdateGames = () => {
  const queryClient = useQueryClient();
  const { userData, updateUserData } = useAuth();

  return useMutation({
    mutationKey: ['updateGames'],
    mutationFn: async (games) => {
      try {
        const token = localStorage.getItem('token');
        console.log('Updating preferred games:', games);

        const response = await axios.post('http://localhost:1111/profile/updateGames',
          {
            preferredGame: games,
            userId: userData.id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        console.log('Server response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error updating games:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('Update success:', data);
      
      // Auth Context 업데이트
      updateUserData({
        ...userData,
        preferredGame: data.preferredGame || data
      });

      // React Query 캐시 업데이트
      queryClient.invalidateQueries({ queryKey: ['profile', userData.id] });
    },
    onError: (error) => {
      console.error('Games update error details:', error);
      if (error.response) {
        console.error('Server error response:', error.response.data);
      }
    }
  });
};