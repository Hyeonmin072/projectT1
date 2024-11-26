import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { GAME_LIST } from '../constants/games';

const VideoDetailsModal = ({ isOpen, onClose, file, userId, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      setTimeout(() => setMounted(false), 300);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!title || !selectedGame) {
      alert('비디오 제목과 게임을 선택해야 합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('title',title);
    formData.append('desc',description);
    formData.append('gameId',Number(selectedGame));
    formData.append('file',file);
    formData.append('userId',userId);

    onSubmit(formData);

    // 상태 초기화 및 모달 닫기
    setTitle('');
    setDescription('');
    setSelectedGame('');
    onClose();
  };

  if (!mounted && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`
          fixed inset-0 bg-black transition-opacity duration-300
          ${isOpen ? 'opacity-50' : 'opacity-0'}
        `}
        onClick={onClose}
      />

      <div
        id="details-modal-content"
        className={`
          relative bg-white rounded-lg shadow-xl w-full max-w-3xl p-3
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-24 scale-90 opacity-0'}
        `}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-semibold text-gray-800">비디오 정보 입력</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">비디오 제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="비디오의 제목을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="비디오에 대한 설명을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">게임 선택</label>
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">게임을 선택하세요</option>
              {GAME_LIST.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title || !selectedGame}
            className={`px-4 py-2 rounded-md text-white
              ${(!title || !selectedGame)
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'}
            `}
          >
            업로드
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsModal;
