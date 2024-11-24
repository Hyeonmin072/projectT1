// components/profile/EditPreferredGameModal.jsx
import React, { useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GAME_LIST } from '../../constants/games';

const EditPreferredGameModal = ({ isOpen, onClose, onSubmit, initialGames = [] }) => {
  const [selectedGames, setSelectedGames] = useState(initialGames);
  const [currentPage, setCurrentPage] = useState(0);
  const sliderRef = useRef(null);

  // 한 페이지에 보여줄 게임 수
  const GAMES_PER_PAGE = 6;
  const TOTAL_PAGES = Math.ceil(GAME_LIST.length / GAMES_PER_PAGE);

  const handleGameToggle = (gameId) => {
    setSelectedGames(prev => {
      if (prev.includes(gameId)) {
        return prev.filter(id => id !== gameId);
      }
      if (prev.length >= 3) {
        alert('최대 3개의 게임만 선택할 수 있습니다.');
        return prev;
      }
      return [...prev, gameId];
    });
  };

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedGames);
  };

  if (!isOpen) return null;

  // 현재 페이지에 표시할 게임들
  const currentGames = GAME_LIST.slice(
    currentPage * GAMES_PER_PAGE,
    (currentPage + 1) * GAMES_PER_PAGE
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">선호 게임 선택</h2>
        <p className="text-sm text-gray-500 mb-4">
          최대 3개까지 선택 가능합니다 (현재 {selectedGames.length}/3)
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            {/* 이전 버튼 */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentPage === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 
                p-2 rounded-full bg-white shadow-lg
                ${currentPage === 0 ? 'text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* 게임 그리드 */}
            <div 
              ref={sliderRef}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-hidden"
            >
              {currentGames.map((game) => (
                <div
                  key={game.id}
                  onClick={() => handleGameToggle(game.id)}
                  className={`
                    cursor-pointer rounded-lg p-4 border-2 transition-all
                    hover:shadow-md
                    ${selectedGames.includes(game.id) 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'}
                  `}
                >
                  <div className="relative pb-[100%]">
                    <img 
                      src={game.image} 
                      alt={game.name} 
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                  <div className="mt-2">
                    <p className="text-center font-medium">{game.name}</p>
                    <p className="text-center text-sm text-gray-500">{game.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 다음 버튼 */}
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === TOTAL_PAGES - 1}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 
                p-2 rounded-full bg-white shadow-lg
                ${currentPage === TOTAL_PAGES - 1 ? 'text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* 페이지 인디케이터 */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: TOTAL_PAGES }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-all
                  ${currentPage === index ? 'bg-blue-500 w-4' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          
          {/* 하단 버튼 */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={selectedGames.length === 0}
              className={`
                px-4 py-2 text-white rounded-lg
                ${selectedGames.length === 0 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'}
              `}
            >
              저장 ({selectedGames.length}/3)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPreferredGameModal;