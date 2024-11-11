import React, { useState, useEffect, useRef } from 'react';
import { X, Send, ArrowLeft } from 'lucide-react';

const ChattingRoom = ({ isOpen, onClose, friend }) => {
  // messages 상태를 사용자별로 관리하는 객체로 변경
  const [messagesByUser, setMessagesByUser] = useState({


    // DB도 대충 이런 형태로 구성해야할듯 ?
    // 초기 더미 데이터를 사용자별로 구성
    1: [
      {
        id: 1,
        sender: 'user',
        text: '안녕하세요! 김현민님',
        timestamp: '오후 2:30'
      },
      {
        id: 2,
        sender: 'friend',
        text: '네, 반갑습니다!',
        timestamp: '오후 2:31'
      }
    ],

    2: [
      {
        id: 1,
        sender: 'user',
        text: '안녕하세요! 김정훈님',
        timestamp: '오후 3:30'
      },
      {
        id: 2,
        sender: 'friend',
        text: '네, 안녕하세요~',
        timestamp: '오후 3:31'
      }
    ],
    3: [
      {
        id: 1,
        sender: 'user',
        text: '안녕하세요! 김형섭님',
        timestamp: '오후 4:30'
      },
      {
        id: 2,
        sender: 'friend',
        text: '반갑습니다!',
        timestamp: '오후 4:31'
      }
    ]
  });
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // 현재 선택된 사용자의 메시지 가져오기
  const currentMessages = friend ? messagesByUser[friend.id] || [] : [];

  // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동하는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  // 메시지 전송 함수
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !friend) return;

    const newMsg = {
      id: (currentMessages.length + 1),
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('ko-KR', { 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true 
      })
    };

    // 특정 사용자의 메시지 배열에만 새 메시지 추가
    setMessagesByUser(prev => ({
      ...prev,
      [friend.id]: [...(prev[friend.id] || []), newMsg]
    }));
    
    setNewMessage('');
  };

  // 채팅방이 처음 열릴 때 해당 사용자의 메시지가 없다면 초기화
  useEffect(() => {
    if (friend && !messagesByUser[friend.id]) {
      setMessagesByUser(prev => ({
        ...prev,
        [friend.id]: []
      }));
    }
  }, [friend]);

  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
          onClick={onClose}
        />
      )}

      {/* 채팅창 */}
      <div className={`fixed top-1/2 left-1/2 w-[480px] h-[600px] bg-white shadow-lg rounded-lg z-[110]  
                      transform -translate-x-1/2 -translate-y-1/2
                      transition-all duration-500 ease-in-out
                      ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <div className="font-medium">{friend?.name || '친구 이름'}</div>
                <div className="text-sm text-gray-500">{friend?.status || '오프라인'}</div>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 메시지 영역 */}
        <div className="flex flex-col h-[calc(600px-132px)] p-4 overflow-y-auto">
          {currentMessages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col mb-4 ${
                message.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-green-500 text-white rounded-tr-none'
                    : 'bg-gray-100 rounded-tl-none'
                }`}
              >
                {message.text}
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {message.timestamp}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 메시지 입력 영역 */}
        <form 
          onSubmit={handleSendMessage}
          className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t rounded-b-lg"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="메시지를 입력하세요"
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-green-500"
            />
            <button
              type="submit"
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600
                       transition-all duration-300 ease-in-out
                       transform hover:scale-105 active:scale-95"
            >
              <Send size={25} />
            </button>
          </div>
        </form>
      </div>
    </>
  );

  
};



export default ChattingRoom;