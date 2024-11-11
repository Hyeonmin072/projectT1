// Community.js
/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { X, Search, UserPlus, MessagesSquare } from 'lucide-react';
import ChattingRoom from './ChattingRoom';
import FriendAxios from '../axios/FriendAxios';
import { useAuth } from '../context/AuthContext'; // 인증 컨텍스트 추가

const Community = ({ isOpen, onClose }) => {
  const { userData } = useAuth();
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [searchNickname, setSearchNickname] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendRequests, setFriendRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 친구 목록 불러오기
  useEffect(() => {
    const loadFriends = async () => {
      try {
        const friendsList = await FriendService.getFriends();
        setFriends(friendsList);
      } catch (error) {
        console.error('친구 목록 로드 실패:', error);
      }
    };

    if (isOpen) {
      loadFriends();
    }
  }, [isOpen]);

  // 친구 검색
  const handleSearch = async () => {
    if (!searchNickname.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await FriendService.searchUsers(searchNickname);
      // 이미 친구인 사용자 필터링
      const filteredResults = results.filter(user => 
        !friends.some(friend => friend.id === user.id) && user.id !== userData.id
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('사용자 검색 실패:', error);
      alert('사용자 검색에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 친구 추가 요청
  const handleAddFriend = async (user) => {
    try {
      await FriendService.sendFriendRequest(user.id);
      alert('친구 요청을 보냈습니다.');
      setSearchResults(prev => prev.filter(result => result.id !== user.id));
    } catch (error) {
      console.error('친구 요청 실패:', error);
      alert('친구 요청에 실패했습니다.');
    }
  };

  // 친구 삭제
  const handleRemoveFriend = async (friendId) => {
    if (!window.confirm('정말 이 친구를 삭제하시겠습니까?')) return;

    try {
      await FriendService.removeFriend(friendId);
      setFriends(prev => prev.filter(friend => friend.id !== friendId));
      alert('친구가 삭제되었습니다.');
    } catch (error) {
      console.error('친구 삭제 실패:', error);
      alert('친구 삭제에 실패했습니다.');
    }
  };

  // 친구 요청 수락
  const handleAcceptRequest = async (requestId) => {
    try {
      const newFriend = await FriendService.acceptFriendRequest(requestId);
      setFriends(prev => [...prev, newFriend]);
      setFriendRequests(prev => prev.filter(request => request.id !== requestId));
      alert('친구 요청을 수락했습니다.');
    } catch (error) {
      console.error('친구 요청 수락 실패:', error);
      alert('친구 요청 수락에 실패했습니다.');
    }
  };

  // 친구 필터링
  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    
    <>
      {/* 오버레이 */}
      <ChattingRoom 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        friend={selectedFriend}
      />
      {isOpen && (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
        />
        )}

      {/* 모달 */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-50 overflow-y-auto 
                      transform transition-transform duration-700 ease-in-out
                      ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
              placeholder="검색"
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
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={() => handleStartChat(friend)}
                  >
                    <MessagesSquare size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 친구 추가 버튼 */}
          <button 
          onClick={() => setShowAddFriend(true)} 
          className="flex items-center justify-center w-full mt-4 p-3 bg-green-500 text-white rounded-lg 
                        hover:bg-green-800 transition-all duration-300 ease-in-out 
                        transform hover:scale-105 active:scale-95 
                        hover:shadow-lg active:shadow-md"
            >
          <UserPlus size={20} className="mr-2" />
          친구 추가하기
        </button>

        {/* 친구 추가 모달 */}
        {showAddFriend && (
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center modal-overlay"
                onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setShowAddFriend(false);
                    setSearchNickname("");
                    setSearchResults([]);
                }
                }}
            >
    <div 
      className="bg-white rounded-lg p-6 w-96 
        animate-in fade-in duration-500 
        slide-in-from-top-4 
        transform transition-all"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">친구 찾기</h3>
        <button 
          onClick={() => {
            setShowAddFriend(false);
            setSearchNickname("");
            setSearchResults([]);
          }}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="닉네임"
                  value={searchNickname}
                  onChange={(e) => setSearchNickname(e.target.value)}
                  className="flex-1 p-2 border rounded-lg"
                />
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  검색
                </button>
              </div>

              <div className="mt-4 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">친구 요청</h3>
                {friendRequests.map(request => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                    <div>
                      <p className="font-medium">{request.senderName}</p>
                      <p className="text-sm text-gray-500">{request.sentAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        수락
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        거절
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 검색 결과 */}
              <div 
                className={`space-y-2 overflow-hidden transition-all duration-500 ease-in-out
                    ${searchResults.length > 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                        {searchResults.map(user => (
                            <div 
                            key={user.id} 
                            className={`flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg
                                transform transition-all duration-500 ease-in-out
                                ${searchResults.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.status}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleAddFriend(user)}
                                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600
                                transition-all duration-300 ease-in-out 
                                hover:scale-105 active:scale-95"
                            >
                                추가
                            </button>
                            </div>
                        ))}
                        </div>
                            </div>
                        </div>
                        )}
                        </div>
                    </div>
                    </>
                    
                );
                };

export default Community;