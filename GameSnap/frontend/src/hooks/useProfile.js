// hooks/useProfile.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile, fetchUserVideos, updateProfile, updatePassword } from '../axios/UserProfileAxios';

export const useProfile = (userId) => {
  const queryClient = useQueryClient();

  // 프로필 데이터 쿼리
  const { data: profileData, isLoading: profileLoading, error: profileError } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => fetchUserProfile(userId),
  });

  // 비디오 데이터 쿼리
  const { data: videosData, isLoading: videosLoading, error: videosError } = useQuery({
    queryKey: ['userVideos', userId],
    queryFn: () => fetchUserVideos(userId),
  });

  // 프로필 업데이트 뮤테이션
  const updateProfileMutation = useMutation({
    mutationFn: (updateData) => updateProfile(userId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', userId]);
    },
  });

  // 비밀번호 업데이트 뮤테이션
  const updatePasswordMutation = useMutation({
    mutationFn: (passwordData) => updatePassword(userId, passwordData),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', userId]);
    },
  });

  return {
    profileData,
    profileLoading,
    profileError,
    videosData,
    videosLoading,
    videosError,
    updateProfile: updateProfileMutation.mutate,
    updatePassword: updatePasswordMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
    isUpdatingPassword: updatePasswordMutation.isPending,
  };
};