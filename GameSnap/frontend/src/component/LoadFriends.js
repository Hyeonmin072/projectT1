import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import FriendAxios from "../axios/FriendAxios";

const LoadFriends = () => {
  const { userData } = useAuth();
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 친구 목록 로드
  const loadFriends = async () => {
    try {
      setIsLoading(true);
      const friendsList = await FriendAxios.getFriendsList(userData.id);
      setFriends(friendsList);
    } catch (error) {
      console.error('친구 목록 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 친구 목록 로드
  useEffect(() => {
    loadFriends();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>친구 목록 로딩 중...</div>
      ) : (
        <div>
          {friends.map(friend => (
            <div key={friend.id} className="flex items-center gap-3 p-3">
              {/* 프로필 이미지 */}
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              {/* 사용자 정보 */}
              <div>
                <div className="font-medium">{friend.name}</div>
                <div className="text-sm text-gray-500">
                  {friend.status === "온라인" ? "온라인" : "오프라인"}
                </div>
              </div>
            </div>
          ))}
          {friends.length === 0 && !isLoading && (
            <div className="text-center text-gray-500">
              친구가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoadFriends;