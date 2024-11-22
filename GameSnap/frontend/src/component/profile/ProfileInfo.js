import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, Phone, Gamepad, FileText, Lock } from 'lucide-react';
import { useUpdateName } from '../../hooks/useUpdateName';
import { useUpdateContent } from '../../hooks/useUpdateContent';
import ProfileItem from './ProfileItem';
import EditContentModal from './EditContentModal';
import EditNameModal from './EditNameModal';

const ProfileInfo = ({ handlePasswordEdit }) => {
  const { userData } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  
  const updateContentMutation = useUpdateContent();
  const updateNameMutation = useUpdateName();

  const handleContentSubmit = (newContent) => {
    updateContentMutation.mutate(newContent, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
      onError: (error) => {
        // 에러 처리
        console.error('자기소개 수정 실패:', error);
        alert('자기소개 수정에 실패했습니다.');
      }
    });
  };
  const handleNameSubmit = (newName) => {
    updateNameMutation.mutate(newName, {
      onSuccess: () => {
        setIsNameModalOpen(false);
      },
      onError: () => {
        alert('이름 수정에 실패했습니다.');
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="space-y-3">
        <ProfileItem 
          icon={User} 
          label="이름" 
          value={userData?.name}
          action={{
            label: "수정",
            onClick: () => setIsNameModalOpen(true)
          }}
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
          isContent={true}
          action={{
            label: "수정",
            onClick: () => setIsModalOpen(true)
          }}
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

      <EditContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleContentSubmit}
        initialContent={userData?.content}
      />

      <EditNameModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        onSubmit={handleNameSubmit}
        initialName={userData?.name}
      />

      
    </div>
  );
};

export default ProfileInfo;