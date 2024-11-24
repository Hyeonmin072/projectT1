// hooks/useUpdateGames.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { GAME_LIST } from '../constants/games';

export const useUpdateGames = () => {
  const queryClient = useQueryClient();
  const { userData, updateUserData } = useAuth();

  return useMutation({
    mutationKey: ['updateGames'],
    mutationFn: async (gameIds) => {
      try {
        const token = localStorage.getItem('token');
        
        // 받은 게임 ID 로그
        console.log('Received gameIds:', gameIds);
        
        // 선택된 게임들의 id와 name만 매핑
        const selectedGames = gameIds.map(id => {
          const game = GAME_LIST.find(g => g.id === id);
          console.log('Found game:', game); // 각 게임 정보 로그
          return {
            id: game.id,
            name: game.name
          };
        });

        // 서버로 보낼 데이터 로그
        console.log('Request payload:', {
          userId: userData.id,
          games: selectedGames
        });

        const response = await axios.post(
          'http://localhost:1111/profile/updateGames',
          {
            userId: userData.id,
            games: selectedGames
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        // 서버 응답 로그
        console.log('Server response:', response.data);

        return response.data;
      } catch (error) {
        console.error('Error updating games:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data
        });
        throw error;
      }
    },
    onSuccess: (data) => {
      // 성공 시 데이터 로그
      console.log('Mutation success data:', data);
      console.log('Current userData:', userData);
      
      // Auth Context 업데이트
      const updatedUserData = {
        ...userData,
        preferredGame: data.games
      };
      
      console.log('Updated userData:', updatedUserData);
      
      updateUserData(updatedUserData);

      // React Query 캐시 업데이트
      queryClient.invalidateQueries(['profile', userData.id]);
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    }
  });
};