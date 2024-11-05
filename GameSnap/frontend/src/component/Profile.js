/* eslint-disable */

import React, { useEffect, useState } from "react";
import { getProfile } from '../axios/UserProfileAxios';

const Profile = ({ userId, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("프로필 출력 완료");
  // 유저 프로필 상태 정의
  const [userInfo, setUserInfo] = useState({
    userid: '',
    username: '',
    email: '',
    phone: '',
    preferredGenre: "", // 기본 선호 장르
    notifications: true,
  });

  // 유저프로필 데이터 로드
  /*useEffect(() => {
    const loadUserProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getProfile(userInfo); // API 요청
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [userInfo]);*/


  // 예시: 컴포넌트가 마운트될 때만 실행하는 useEffect
  useEffect(() => {
    // userInfo 상태를 업데이트하는 로직
    setUserInfo({
      userid: '1234567890',
      username: '홍길동',
      email: 'example@example.com',
      phone: '010-1234-5678',
      password: "1234",
      preferredGenre: "No",
      notifications: true,
    });
  }, [userInfo]);

  // 로딩 상태 처리
  if (!userInfo || !userInfo.userid) {
    return <p>Loading...</p>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      {/* 배경 오버레이 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={(onClose) => console.log('닫기 버튼 클릭')}
      />

      {/* 프로필 정보 폼 */}
      <div className="bg-white rounded-lg w-full max-w-md relative z-60 p-6">
        <h2 className="text-xl font-bold text-center mb-6">프로필</h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="font-semibold">아이디:</label>
            <span>{userInfo.userid}</span>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold">이름:</label>
            <span>{userInfo.username}</span>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold">이메일:</label>
            <span>{userInfo.email}</span>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold">전화번호:</label>
            <span>{userInfo.phone}</span>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold">선호 장르:</label>
            <span>{userInfo.preferredGenre}</span>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold">알림 설정:</label>
            <span>{userInfo.notifications ? 'On' : 'Off'}</span>
          </div>
        </div>

        <button
          onClick={onClose} // 닫기 버튼 클릭 시 onClose 호출
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 
                     transition-colors duration-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};


export default Profile;