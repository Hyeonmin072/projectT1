// components/profile/ProfileInfo.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, Phone, Gamepad, FileText, Lock } from 'lucide-react';
import { useUpdateName } from '../../hooks/useUpdateName';
import { useUpdateContent } from '../../hooks/useUpdateContent';
import { useUpdateGames } from '../../hooks/useUpdateGames';
import { getGameNameById } from '../../constants/games';
import ProfileItem from './ProfileItem';
import EditContentModal from './EditContentModal';
import EditNameModal from './EditNameModal';
import EditPreferredGameModal from './EditPreferredGameModal';

const ProfileInfo = ({ handlePasswordEdit }) => {
  const { userData , setUserData} = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [gameDisplay, setGameDisplay] = useState("");
  
  const updateContentMutation = useUpdateContent();
  const updateNameMutation = useUpdateName();
  const updateGamesMutation = useUpdateGames();

  useEffect(() => {
    // 선호 게임 정보가 변경될 때마다 gameDisplay 업데이트
    setGameDisplay(
      userData?.likeGamesId
        ?.map(gameId => getGameNameById(gameId))
        .join(", ") || "선택된 게임 없음"
    );
  }, [userData?.preferredGame]);
  

  const handleContentSubmit = (newContent) => {
    updateContentMutation.mutate(newContent, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
      onError: (error) => {
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

  const handleGameSubmit = (selectedGames) => {
    console.log('selectedGames',selectedGames);
    updateGamesMutation.mutate(selectedGames, {
      onSuccess: (response) => {
        console.log("선호게임 response data:",response);
        setGameDisplay(
          selectedGames
            .map(gameId => getGameNameById(gameId))
            .join(", ")
        );
        setIsGameModalOpen(false);
        setUserData({
          ...userData,
          likeGamesId : response.likeGamesId,
          preferredGame : response.likeGamesName
        });
      },
      onError: () => {
        alert('선호 게임 수정에 실패했습니다.');
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
            label: updateNameMutation.isPending ? "수정 중..." : "수정",
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
          value={gameDisplay}
          action={{
            label: updateGamesMutation.isPending ? "수정 중..." : "수정",
            onClick: () => setIsGameModalOpen(true)
          }}
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

      <EditPreferredGameModal
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
        onSubmit={handleGameSubmit}
        initialGames={userData?.likeGamesId || []}
      />
    </div>
  );
};

export default ProfileInfo;