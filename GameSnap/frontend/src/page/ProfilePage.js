import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  User, 
  Mail, 
  Phone, 
  GamepadTwo, 
  FileText, 
  Lock,
  Edit
} from "lucide-react";

const ProfilePage = () => {
  const { userData } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const handlePasswordEdit = () => {
    navigate("/profile/edit-password");
  };

  const ProfileItem = ({ icon: Icon, label, value, action }) => (
    <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
      <Icon className="w-5 h-5 text-gray-500 mr-3" />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base font-semibold text-gray-900">{value || "정보 없음"}</p>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="ml-4 flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 rounded-full border border-blue-200 hover:border-blue-300 transition-all duration-200"
        >
          <Edit className="w-4 h-4" />
          {action.label}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">프로필</h2>
              <p className="text-sm text-gray-500 mt-1">
                {userData?.email}님의 프로필 정보
              </p>
            </div>
            <button
              onClick={handleEditProfile}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              <Edit className="w-4 h-4" />
              프로필 수정
            </button>
          </div>

          <div className="space-y-3">
            <ProfileItem 
              icon={User} 
              label="이름" 
              value={userData?.name} 
            />
            
            <ProfileItem 
              icon={Mail} 
              label="이메일" 
              value={userData?.email} 
            />
            
            <ProfileItem 
              icon={Phone} 
              label="전화번호" 
              value={userData?.tel} 
            />
            
            <ProfileItem 
              icon={GamepadTwo} 
              label="선호 게임" 
              value={userData?.preferredGame?.join(", ")} 
            />
            
            <ProfileItem 
              icon={FileText} 
              label="자기소개" 
              value={userData?.content} 
            />
            
            <ProfileItem 
              icon={Lock} 
              label="비밀번호" 
              value={showPassword ? userData?.password : "*".repeat(userData?.password?.length || 8)}
              action={{
                label: "비밀번호 변경",
                onClick: handlePasswordEdit
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;