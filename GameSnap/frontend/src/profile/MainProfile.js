/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../axios/UserProfileAxios";
import SetProfile from "./UpdateProfile";
import Defaultimg  from "../assets/profileimg.png";

const Profile = (props) => {
  const { onClose, id } = props || {};
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  
  const profileRef = useRef(null);
  const navigate = useNavigate();
  

  const handleEditProfile = () => {
    setIsEditing(true);
    setTimeout(() => {
      onClose?.(navigate("/profile/edit"))
    });
  }

  // console.log("프로필 출력 완료");
  // // 유저 프로필 상태 정의
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    preferredGenre: '',
    password: ''
  }); // 초기화하기

  useEffect(() => {
    const loadUserProfile = async () => {
      setIsLoading(true);
      /*
      try{
        const response = await fetch(
          '서버URL/user/${id}',
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          }
        );
        const result = await response.json();
        if (response.ok) {
          setUserInfo(result); // 서버에서 받은 데이터를 사용
        }
      }
      */
      
      try {
        const response = await getProfile(id);
        const result = await response.json();
        setUserInfo(result); // API 결과가 없으면 기본값 사용
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      loadUserProfile();
    }
  }, [id]);


  const handleUpdateProfile = (updatedInfo) => {
    setUserInfo(updatedInfo);
    setIsEditing(false); // 수정 모드를 종료
  };

  const handleClose = () => {
    setIsProfileVisible(false);  // 프로필 화면을 숨김
    setIsVisible(false);
    setIsEditing(false);
    setTimeout(() => {
      onClose?.();
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        {/* 배경 오버레이 */}
        <div className="fixed inset-0 bg-black bg-opacity-50" 
      onClick={handleClose} 
      />
        {/* 프로필 정보 폼 */}
      <div ref={profileRef} className="bg-white rounded-lg w-full max-w-md relative z-60 p-10">
        <h2 className="text-xl font-bold text-center mb-6"> {userInfo.name}의 프로필</h2>

        <div className="space-y-3 border-t-2 border-b-2 border-gray-500 p-2 m-4">
            <div className={`flex justify-between`}>
              <label className="font-semibold hidden">아이디:</label>
              <span className="hidden ml-auto">{userInfo.id}</span>
            <div className="profile-setting-main-profile-change-container">
        </div>

            </div>
            <div className="flex justify-between">
                <label className="font-semibold">이름:</label>
                <span className="ml-auto">{userInfo.name}</span>
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
              <label className="font-semibold">비밀번호</label>
              <span className="ml-auto">
              {showPassword ? userInfo.password : '*'.repeat(userInfo.password.length)}
              </span>
              <button 
              onClick={togglePasswordVisibility}
              className="right-4 text-black-500
              border-2 border-gray-500 p-1 ml-2">
                {showPassword ? '숨기기' : '보기'}
              </button>
            </div>            
            <div className="flex justify-between">
              <label className="font-semibold">알림 설정:</label>
              <input 
              type="checkbox" 
              checked={notifications} 
              onChange={(e) => setNotifications(
                prev => e.target.checked, )}
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
        onClick={handleClose} // 닫기 버튼 클릭 시 onClose 호출
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 
                    transition-colors duration-200"
        >
        ✕
        </button>
      </div>

      {/* 수정 모드일 때만 SetProfile 컴포넌트 렌더링 */}
      {isEditing && isProfileVisible &&(
        <SetProfile
          userInfo={userInfo}
          onClose={handleClose}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
    </div>
  );
};


export default Profile;