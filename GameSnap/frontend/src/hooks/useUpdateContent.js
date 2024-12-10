// hooks/useUpdateContent.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const useUpdateContent = () => {
  const queryClient = useQueryClient();
  const { userData, updateUserData } = useAuth();

  return useMutation({
    mutationKey: ['updateContent'],
    mutationFn: async (content) => {
      try {
        const token = localStorage.getItem('token');
        console.log('Sending content update:', { content, userId: userData.id }); // 요청 데이터 로깅

        const response = await axios.post('http://localhost:1111/profile/updateContent', 
          { 
            content: content,    // 명시적으로 content 필드 지정
            userId: userData.id,
          }, 
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        console.log('Server response:', response.data); // 서버 응답 로깅
        return response.data;
      } catch (error) {
        console.error('Error updating content:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      // 서버 응답 데이터 구조 확인
      console.log('Success data:', data);

      // userData 업데이트 전 현재 상태 로깅
      console.log('Current userData:', userData);

      // Auth Context 업데이트
      const updatedUserData = {
        ...userData,
        content: data.content || data  // 서버 응답 구조에 따라 적절한 필드 선택
      };

      console.log('Updated userData:', updatedUserData); // 업데이트될 데이터 로깅
      
      // Context 업데이트
      updateUserData(updatedUserData);

      // React Query 캐시 업데이트
      queryClient.invalidateQueries({ queryKey: ['profile', userData.id] });
    },
    onError: (error) => {
      console.error('Content update error details:', error);
      if (error.response) {
        console.error('Server error response:', error.response.data);
      }
    }
  });
};