// Community.js
/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { X, Search, UserPlus, MessagesSquare } from 'lucide-react';

const Community = ({ onClose }) => {
  const [friends, setFriends] = useState([
    { id: 1, name: "김철수", status: "온라인", lastSeen: "방금 전" },
    { id: 2, name: "이영희", status: "오프라인", lastSeen: "1시간 전" },
    { id: 3, name: "박지성", status: "온라인", lastSeen: "방금 전" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  // 검색 필터링
  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-50 overflow-y-auto">
        <div className="p-4">
          {/* 헤더 */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">친구 목록</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {/* 검색바 */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="친구 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border rounded-lg"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>

          {/* 친구 목록 */}
          <div className="space-y-2">
            {filteredFriends.map(friend => (
              <div key={friend.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {/* 프로필 이미지 */}
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-200 rounded-full">
                      {/* 프로필 이미지가 있다면 여기에 추가 */}
                    </div>
                    <div 
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                        ${friend.status === "온라인" ? "bg-green-500" : "bg-gray-400"}`}
                    />
                  </div>
                  
                  {/* 사용자 정보 */}
                  <div>
                    <div className="font-medium">{friend.name}</div>
                    <div className="text-sm text-gray-500">{friend.lastSeen}</div>
                  </div>
                </div>

                {/* 액션 버튼들 */}
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MessagesSquare size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 친구 추가 버튼 */}
          <button className="flex items-center justify-center w-full mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <UserPlus size={20} className="mr-2" />
            친구 추가하기
          </button>
        </div>
      </div>
    </>
  );
};

export default Community;