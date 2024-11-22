// hooks/useProfile.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileAPI } from '../axios/UserProfileAxios';
import { useAuth } from '../context/AuthContext'; 

export const useProfile = (userId) => {
  const queryClient = useQueryClient();
  const { userData, updateUserData } = useAuth();

  // 프로필 데이터 쿼리
  const { data: profileData, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => profileAPI.fetchUserProfile(userId),
    onSuccess: (data) => {
      updateUserData({
        ...userData,
        image: data.image
      });
    }
  });

  // 비디오 데이터 쿼리
  const { data: videosData, isLoading: videosLoading, error: videosError } = useQuery({
    queryKey: ['userVideos', userId],
    queryFn: () => profileAPI.fetchUserVideos(userId),
  });

  // 프로필 업데이트 뮤테이션
  const updateProfileMutation = useMutation({
    mutationFn: (updateData) => profileAPI.updateProfile(userId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', userId]);
    },
  });

  // 이미지 업데이트 뮤테이션
  // hooks/useProfile.js
// hooks/useProfile.js
const updateImageMutation = useMutation({
  mutationFn: async (formData) => {
      const response = await profileAPI.uploadImage(formData);
      console.log('Upload Response:', response);
      return response.data;
  },
  onSuccess: (response) => {
      console.log('이전 userData:', userData);
      
      const newUserData = {
          ...userData,
          image: response.data  // 또는 response.data.imageUrl, 실제 응답 구조에 따라 수정
      };
      
      console.log('새로운 userData:', newUserData);

      // 먼저 React Query 캐시 업데이트
      queryClient.setQueryData(['profile', userId], newUserData);

      // 그 다음 Auth Context 업데이트
      updateUserData(newUserData);

      // 마지막으로 쿼리 무효화
      queryClient.invalidateQueries({
          queryKey: ['profile', userId],
          exact: true
      });
  },
  onError: (error) => {
      console.error('Image upload error:', error);
  }
});

  return {
    profileData,
    profileLoading,
    profileError,
    videosData,
    videosLoading,
    videosError,
    updateProfile: updateProfileMutation.mutate,
    updateImage: updateImageMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    isUpdatingImage: updateImageMutation.isPending,
  };
};