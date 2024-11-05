import React, { useEffect, useState } from "react";
import { getProfile, updateProfile, updatePassword } from './axios/UserProfileAxios';

const Profile = () => {
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
      try {
        const response = await getProfile(userInfo); // API 요청
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to load profile:", error);
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
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">프로필</h2>
  <div className="flex justify-between items-center border-b pb-2 mb-4">
    <label className="text-gray-600">아이디:</label>
    <span className="text-gray-900">**********</span> {/* 숨기기 위해 표시하지 않음 */}
  </div>
  <div className="flex justify-between items-center border-b pb-2 mb-4">
    <label className="text-gray-600">이름:</label>
    <span className="text-gray-900">{userInfo.username}</span>
  </div>
  <div className="flex justify-between items-center border-b pb-2 mb-4">
    <label className="text-gray-600">이메일:</label>
    <span className="text-gray-900">{userInfo.email}</span>
  </div>
  <div className="flex justify-between items-center border-b pb-2 mb-4">
    <label className="text-gray-600">전화번호:</label>
    <span className="text-gray-900">{userInfo.phone}</span>
  </div>
  <div className="flex justify-between items-center border-b pb-2 mb-4">
    <label className="text-gray-600">선호 장르:</label>
    <span className="text-gray-900">{userInfo.preferredGenre}</span>
  </div>
  <div className="flex justify-between items-center">
    <label className="text-gray-600">알림 설정:</label>
    <span className="text-gray-900">{userInfo.notifications ? "On" : "Off"}</span>
  </div>
</div>

  );
};


export default Profile;