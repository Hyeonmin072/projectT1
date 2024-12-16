import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { GAME_LIST } from '../constants/games';

export const useUpdateGames = () => {
  const queryClient = useQueryClient();
  const { userData, updateUserData } = useAuth();

  // 게임 이름으로 ID를 찾는 헬퍼 함수
  const getGameIdByName = (gameName) => {
    const game = GAME_LIST.find(g => g.name === gameName);
    return game ? game.id : null;
  };

  return useMutation({
    mutationKey: ['updateGames'],
    mutationFn: async (gameIds) => {
      try {
        const token = localStorage.getItem('token');
        
        // gameIds를 변환 - 문자열인 경우 해당하는 게임 ID를 찾아서 변환
        const normalizedGameIds = gameIds.map(id => {
          if (typeof id === 'string') {
            const gameId = getGameIdByName(id);
            console.log(`게임 이름 "${id}"에 대한 ID 변환 결과:`, gameId);
            return gameId;
          }
          return id;
        }).filter(id => id !== null); // null 값 제거
        
        console.log('변환 결과:', {
          원본_데이터: gameIds,
          변환된_ID: normalizedGameIds
        });
        
        const requestData = {
          userId: userData.id,
          likeGamesId: normalizedGameIds
        };

        console.log('서버 요청 데이터:', requestData);
        
        const response = await axios.post(
          'http://13.209.226.109:1111/profile/updateLikeGames',
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        console.log('서버 응답:', response.data);

        return response.data;
      } catch (error) {
        console.error('에러 발생:', error);
        console.error('에러 상세:', {
          메시지: error.message,
          응답: error.response?.data
        });
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('처리 성공 데이터:', data);
      
      const updatedUserData = {
        ...userData,
        preferredGame: data.games
      };
      
      console.log('업데이트될 사용자 데이터:', updatedUserData);
      updateUserData(updatedUserData);

      queryClient.invalidateQueries(['profile', userData.id]);
    },
    onError: (error) => {
      console.error('처리 실패:', error);
    }
  });
};