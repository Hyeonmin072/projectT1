// pages/ProfilePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Info, Video } from "lucide-react";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../context/AuthContext"; // 현재 로그인한 유저 정보를 가져오기 위해

import ProfileHeader from "../component/profile/ProfileHeader";
import ProfileInfo from "../component/profile/ProfileInfo";
import ProfileVideos from "../component/profile/ProfileVideos";
import LoadingSpinner from "../component/common/LoadingSpinner";
import ErrorMessage from "../component/common/ErrorMessage";

const ProfilePage = () => {
  const { userData } = useAuth(); // 현재 로그인한 유저 정보
  console.log("ProfilePage: user",userData);
  const { 
    profileData,
    profileLoading,
    profileError,
    videosData,
    videosLoading,
    videosError,
    updateProfile,
    updatePassword,
    isUpdating,
    isUpdatingPassword
  } = useProfile(userData?.id);

  const [activeTab, setActiveTab] = useState('info');
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const handlePasswordEdit = (passwordData) => {
    updatePassword(passwordData);
  };

//   if (profileLoading) {
//     return <LoadingSpinner />;
//   }

//   if (profileError) {
//     return <ErrorMessage message={profileError.message} />;
//   }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 프로필 헤더 */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <ProfileHeader 
            userData={profileData} 
            handleEditProfile={handleEditProfile}
            isUpdating={isUpdating}
          />

          {/* 탭 네비게이션 */}
          <div className="flex border-t">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2
                ${activeTab === 'info' 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Info className="w-4 h-4" />
              프로필 정보
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2
                ${activeTab === 'videos' 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Video className="w-4 h-4" />
              내 동영상
            </button>
          </div>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="transition-all duration-300">
          {activeTab === 'info' ? (
            <ProfileInfo 
              userData={profileData}
              handlePasswordEdit={handlePasswordEdit}
              isUpdatingPassword={isUpdatingPassword}
            />
          ) : (
            videosLoading ? (
              <LoadingSpinner />
            ) : videosError ? (
              <ErrorMessage message={videosError.message} />
            ) : (
              <ProfileVideos videos={videosData} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;