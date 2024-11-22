// components/profile/ProfileHeader.jsx
import React from 'react';
import { User, Camera, Edit } from 'lucide-react';
import { useAuth } from "../../context/AuthContext"; // 경로는 실제 위치에 맞게 수정

const ProfileHeader = ({handleEditProfile }) => {
  const { userData } = useAuth(); // AuthContext에서 직접 userData 가져오기
  return (
    <div className="p-6">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
            {userData?.profileImage ? (
              <img 
                src={userData.profileImage} 
                alt="프로필 사진" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
          <button 
            onClick={handleEditProfile}
            className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-4">{userData?.name || "사용자"}</h2>
        <p className="text-sm text-gray-500">{userData?.email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;