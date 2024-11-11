import React, { useState, useEffect, useRef } from 'react';
import { X, Send, ArrowLeft } from 'lucide-react';

const ChattingRoom = ({ isOpen, onClose, friend }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'user',
      text: '안녕하세요!',
      timestamp: '오후 2:30'
    },
    {
      id: 2,
      sender: 'friend',
      text: '네, 안녕하세요!',
      timestamp: '오후 2:31'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 메시지 전송 함수
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('ko-KR', { 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true 
      })
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  };

  return (
    <>
      {/* 오버레이 - z-index만 수정 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
          onClick={onClose}
        />
      )}


      {/* 채팅창 - 위치와 스타일을 중앙 모달로 변경 */}
      <div className={`fixed top-1/2 left-1/2 w-[480px] h-[600px] bg-white shadow-lg rounded-lg z-[110]  
                      transform -translate-x-1/2 -translate-y-1/2
                      transition-all duration-500 ease-in-out
                      ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        {/* 헤더 - 스타일 수정 */}
        <div className="flex items-center justify-between p-4 border-b rounded-t-lg">
          <div className="flex items-center gap-3">
            {/* 뒤로가기 버튼을 X 버튼으로 변경 */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <div className="font-medium">{friend?.name || '친구 이름'}</div>
                <div className="text-sm text-gray-500">온라인</div>
              </div>
            </div>
          </div>
          {/* X 버튼 추가 */}
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 메시지 영역 - 높이 계산 수정 */}
        <div className="flex flex-col h-[calc(600px-132px)] p-4 overflow-y-auto">
          {messages.map((message) => (
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

        {/* 메시지 입력 영역 - 둥근 모서리 추가 */}
        <form 
          onSubmit={handleSendMessage}
          className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t rounded-b-lg"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-green-500"
            />
            <button
              type="submit"
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600
                       transition-all duration-300 ease-in-out
                       transform hover:scale-105 active:scale-95"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChattingRoom;