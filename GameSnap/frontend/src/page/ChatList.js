import React, { useState, useEffect } from 'react';
import { Search, MessagesSquare, ChevronLeft } from 'lucide-react';

const ChatList = () => {
  const [activeChatRooms, setActiveChatRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 로컬 스토리지나 전역 상태에서 활성화된 채팅방 정보를 가져옴
  useEffect(() => {
    // 예시: 로컬 스토리지에서 활성 채팅방 데이터 불러오기
    const savedChats = localStorage.getItem('activeChats');
    if (savedChats) {
      setActiveChatRooms(JSON.parse(savedChats));
    }
  }, []);

  // 검색 필터링
  const filteredChatRooms = activeChatRooms.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <button className="hover:bg-gray-100 p-2 rounded-full">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold">진행 중인 채팅</h1>
            <p className="text-sm text-gray-500">
              {activeChatRooms.length > 0 
                ? `${activeChatRooms.length}개의 채팅방`
                : '진행 중인 채팅이 없습니다'}
            </p>
          </div>
        </div>
      </div>

      {/* 검색바 */}
      <div className="p-4 border-b bg-white">
        <div className="relative">
          <input
            type="text"
            placeholder="채팅방 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 bg-gray-50 border rounded-xl focus:outline-none focus:border-green-500"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* 채팅방 목록 */}
      <div className="flex-1 overflow-y-auto">
        {filteredChatRooms.length > 0 ? (
          filteredChatRooms.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors"
            >
              {/* 프로필 */}
              <div className="relative">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">
                    {chat.name.charAt(0)}
                  </span>
                </div>
                <div
                  className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white
                    ${chat.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
                />
              </div>

              {/* 채팅방 정보 */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-lg">{chat.name}</span>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
                    {chat.lastMessageTime}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 truncate text-sm">
                    {chat.lastMessage}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className="min-w-[20px] h-5 flex items-center justify-center bg-green-500 text-white rounded-full text-xs px-1.5 ml-2">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          // 채팅방이 없을 때 표시할 내용
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessagesSquare size={48} className="mb-4 opacity-50" />
            <p className="text-lg mb-2">진행 중인 채팅이 없습니다</p>
            <p className="text-sm">친구 목록에서 새로운 채팅을 시작해보세요</p>
          </div>
        )}
      </div>

      {/* 친구 목록으로 이동하는 버튼 */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={() => {/* 친구 목록으로 이동하는 로직 */}}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg
                   transition-all duration-300 ease-in-out 
                   transform hover:scale-105 active:scale-95"
        >
          <MessagesSquare size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatList;