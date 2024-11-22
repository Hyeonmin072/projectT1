import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // 경로는 실제 위치에 맞게 수정
import { User, Mail, Phone, Gamepad, FileText, Lock } from 'lucide-react';
import ProfileItem from './ProfileItem';

const ProfileInfo = ({ handlePasswordEdit }) => {
  const { userData } = useAuth(); // AuthContext에서 직접 userData 가져오기
  const [showPassword, setShowPassword] = useState(false); // 필요한 경우 상태 추가

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
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
          icon={Gamepad} 
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
  );
};

export default ProfileInfo;