// components/profile/EditNameModal.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { checkNameDuplicate } from '../../axios/RegisterAxios'; // 기존 중복 체크 함수 재사용

const EditNameModal = ({ isOpen, onClose, onSubmit, initialName }) => {
  const [name, setName] = useState(initialName || '');
  const [isNameLocked, setIsNameLocked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // 닉네임 중복 체크 mutation
  const nameCheckMutation = useMutation({
    mutationFn: async (name) => {
      return await checkNameDuplicate(name);
    },
    onSuccess: (response) => {
      if (response.available) {
        setIsNameLocked(true);
        showTooltipMessage(response.message, true);
      } else {
        showTooltipMessage(response.message, false);
      }
    },
    onError: (error) => {
      showTooltipMessage("중복 확인 중 오류가 발생했어요.", false);
      console.error("중복확인 에러:", error);
    }
  });

  const showTooltipMessage = (message, isSuccess) => {
    setShowTooltip(true);
    nameCheckMutation.data = { 
      available: isSuccess, 
      message 
    };
    setTimeout(() => setShowTooltip(false), 2000);
  };

  const handleUnlockName = () => {
    setIsNameLocked(false);
    nameCheckMutation.reset();
  };

  const handleNameCheck = () => {
    if (!name) {
      showTooltipMessage('닉네임을 입력해주세요.', false);
      return;
    }
    nameCheckMutation.mutate(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNameLocked) {
      showTooltipMessage('닉네임 중복 확인이 필요해요.', false);
      return;
    }
    onSubmit(name);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">이름 수정</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="flex gap-2">
              <div className="relative flex items-center w-[70%]">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    if (!isNameLocked) {
                      setName(e.target.value.trim());
                    }
                  }}
                  placeholder="닉네임을 입력해주세요"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    ${isNameLocked ? 
                      'bg-gray-100 cursor-not-allowed opacity-70 border-gray-300' : 
                      'bg-white'}`}
                  disabled={isNameLocked}
                  maxLength={10}
                />
                {isNameLocked && (
                  <button
                    type="button"
                    onClick={handleUnlockName}
                    className="absolute -right-10 top-1/2 transform -translate-y-1/2 
                            text-gray-500 hover:text-gray-700 bg-transparent p-1 
                            rounded-full hover:bg-green-400 transition-colors"
                  >
                    ✎
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={handleNameCheck}
                disabled={isNameLocked || nameCheckMutation.isPending}
                className={`w-[30%] py-2 px-4 rounded-lg border 
                  transition-colors duration-300
                  ${isNameLocked 
                    ? 'bg-green-100 text-green-800 border-green-500' 
                    : 'bg-white hover:bg-gray-300 text-black border-gray-500'}`}
              >
                {nameCheckMutation.isPending ? '확인 중...' : isNameLocked ? '확인 완료' : '중복 확인'}
              </button>
            </div>

            {/* 툴팁 메시지 */}
            {showTooltip && nameCheckMutation.data?.message && (
              <div className={`
                absolute -top-12 right-0 
                px-3 py-2 rounded-lg
                ${nameCheckMutation.data?.available 
                  ? 'bg-green-50 bg-opacity-90 text-green-700' 
                  : 'bg-red-50 bg-opacity-90 text-red-700'}
                backdrop-blur-sm text-sm
                shadow-lg z-10
                border border-opacity-20
                ${nameCheckMutation.data?.available 
                  ? 'border-green-200' 
                  : 'border-red-200'}
              `}>
                <p className="flex items-center gap-1">
                  {nameCheckMutation.data?.available ? '✓' : '!'} {nameCheckMutation.data?.message}
                </p>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!isNameLocked}
              className={`px-4 py-2 rounded-lg
                ${isNameLocked
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNameModal;