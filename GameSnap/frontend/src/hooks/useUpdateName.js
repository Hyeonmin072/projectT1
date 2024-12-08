// hooks/useUpdateName.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const useUpdateName = () => {
  const queryClient = useQueryClient();
  const { userData, updateUserData } = useAuth();

  return useMutation({
    mutationKey: ['updateName'],
    mutationFn: async (name) => {
      try {
        const token = localStorage.getItem('token');
        console.log('Sending name update:', { name, userId: userData.id }); // 요청 데이터 로깅
        
        const response = await axios.post('http://3.37.183.85:1111/profile/updateName', 
          {   
            userName: name,    // 서버 API가 예상하는 필드명 사용
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
        console.error('Error updating name:', error);
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
        name: data.name || data.userName || data  // 서버 응답 구조에 따라 적절한 필드 선택
      };

      console.log('Updated userData:', updatedUserData); // 업데이트될 데이터 로깅
      
      // Context 업데이트
      updateUserData(updatedUserData);

      // React Query 캐시 업데이트
      queryClient.invalidateQueries({ queryKey: ['profile', userData.id] });
    },
    onError: (error) => {
      console.error('Name update error details:', error);
      if (error.response) {
        console.error('Server error response:', error.response.data);
      }
    }
  });
};