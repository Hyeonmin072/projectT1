// components/profile/EditPreferredGameModal.jsx
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GAME_LIST } from '../../constants/games';
import { motion, AnimatePresence } from 'framer-motion';

const EditPreferredGameModal = ({ isOpen, onClose, onSubmit, initialGames = [] }) => {
  const [selectedGames, setSelectedGames] = useState(initialGames);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // 모달 열릴 때 초기값으로 설정
      setSelectedGames(initialGames);
    }
  }, [isOpen, initialGames]);
  
  if (!isOpen) return null;

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(GAME_LIST.length / ITEMS_PER_PAGE);
  
  const handleGameToggle = (gameId) => {
    setSelectedGames(prev => {
      if (prev.includes(gameId)) {
        return prev.filter(id => id !== gameId);
      }
      return [...prev, gameId];
    });
  };

  const nextPage = () => {
    setDirection(1);
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    setDirection(-1);
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const currentGames = GAME_LIST.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );


  
  


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-lg w-full max-w-md"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg">선호 게임 선택</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* 게임 선택 영역 */}
        <div className="relative px-12 py-6">
          {/* 네비게이션 버튼 */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            {currentPage > 0 && (
              <button 
                onClick={prevPage}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 
                         transition-colors focus:outline-none"
              >
                <ChevronLeft size={20} />
              </button>
            )}
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center">
            {currentPage < totalPages - 1 && (
              <button 
                onClick={nextPage}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 
                         transition-colors focus:outline-none"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {/* 게임 그리드 */}
          <div className="overflow-hidden p-1">
            <div className="relative h-[300px]"> {/* 고정 높이로 레이아웃 안정화 */}
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentPage}
                  custom={direction}
                  initial={{ x: direction * 100 + '%' }}
                  animate={{ 
                    x: 0,
                    transition: { type: "spring", stiffness: 300, damping: 30 }
                  }}
                  exit={{ 
                    x: direction * -100 + '%',
                    transition: { type: "spring", stiffness: 300, damping: 30 }
                  }}
                  className="grid grid-cols-3 gap-4 absolute w-full"
                >
                  {currentGames.map((game) => (
                    <div 
                      key={game.id} 
                      onClick={() => handleGameToggle(game.id)}
                      className={`
                        relative p-1 cursor-pointer rounded-xl
                        ${selectedGames.includes(game.id) 
                          ? 'ring-2 ring-green-500 bg-green-50' 
                          : 'hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="w-full aspect-square p-2">
                        <img 
                          src={game.image} 
                          alt={game.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-sm text-center mt-1">{game.name}</p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 페이지 인디케이터 */}
          <div className="flex justify-center mt-6 gap-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  width: currentPage === index ? 12 : 6,
                  backgroundColor: currentPage === index ? "#3B82F6" : "#D1D5DB"
                }}
                className="h-1.5 rounded-full"
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="px-6 py-4 border-t flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {selectedGames.length}개 선택됨
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 
                       transition-colors"
            >
              취소
            </button>
            <button
              onClick={() => {
                onSubmit(selectedGames);
                onClose();
              }}
              className="px-4 py-2 text-sm text-white bg-green-500 rounded-lg 
                       hover:bg-green-600 transition-colors"
            >
              선택 완료
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditPreferredGameModal;