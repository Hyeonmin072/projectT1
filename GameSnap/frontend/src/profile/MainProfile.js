/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../axios/UserProfileAxios";

const Profile = ({ userid, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);; 
  const [notifications, setNotifications] = useState(false);
  
  const navigate = useNavigate();
  

  const handleEditProfile = () => {
    navigate('/profile/edit');
  }

  // console.log("프로필 출력 완료");
  // // 유저 프로필 상태 정의
  const [userInfo, setUserInfo] = useState({
    userid: '1',
    username: '',
    email: '',
    phone: '',
    preferredGenre: "", // 기본 선호 장르
  });

  // 유저프로필 데이터 로드
  const loadUserProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getProfile(userid); // API 요청
      setUserInfo(response);
      // setUserInfo({
      //   userid: '1234567890',
      //   username: '홍길동',
      //   email: 'example@example.com',
      //   phone: '010-1234-5678',
      //   password: "1234",
      //   preferredGenre: "No" 
      // });
    } catch (error) {
      setError("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userid) {
    loadUserProfile();}
  }, [userid]);
    

  // 로딩 상태 처리
  if (!userInfo || !userInfo.userid) {
    return <p>Loading...</p>;
  }

  if(error){
    return <p>{error}</p>;
  }

  if (!userInfo.userid) {
    return <p>프로필 정보가 없습니다.</p>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        {/* 배경 오버레이 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose} // 닫기 버튼 클릭 시 onClose 호출
      />
        {/* 프로필 정보 폼 */}
      <div className="bg-white rounded-lg w-full max-w-md relative z-60 p-10">
        <h2 className="text-xl font-bold text-center mb-6">프로필</h2>

        <div className="space-y-3 border-t-2 border-b-2 border-gray-500 p-2 m-4">
            <div className={`flex justify-between`}>
                <label className="font-semibold hidden">아이디:</label>
                <span className="hidden ml-auto">{userInfo.userid}</span>
            </div>
            <div className="flex justify-between">
                <label className="font-semibold">이름:</label>
                <span className="ml-auto">{userInfo.username}</span>
            </div>
            <div className="flex justify-between">
                <label className="font-semibold">이메일:</label>
                <span className="ml-auto">{userInfo.email}</span>
            </div>
            <div className="flex justify-between">
                <label className="font-semibold">전화번호:</label>
                <span className="ml-auto">{userInfo.phone}</span>
            </div>
            <div className="flex justify-between">
                <label className="font-semibold">선호 장르:</label>
                <span className="ml-auto">{userInfo.preferredGenre}</span>
            </div>
            <div className="flex justify-between">
              <label className="font-semibold">알림 설정:</label>
              <input 
              type="checkbox" 
              checked={notifications} 
              onChange={(e) => setNotifications(
                e.target.checked, )}
              className="ml-auto"
              />
              {/* 체크박스 상태에 따라 On/Off 텍스트 표시 */}
              <span className="ml-2 font-bold">
                {notifications ? 'On' : 'Off'}
                </span>  
            </div> 
          </div>

        <button
          onClick={handleEditProfile} // 프로필 업데이트 시 onUpdateProfile 호출
          className="absolute right-4 bottom-4 text-black-500
          border-2 border-gray-500 p-1"
          >
          프로필 수정
        </button>

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