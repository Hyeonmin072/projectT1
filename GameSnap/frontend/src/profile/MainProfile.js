import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../axios/UserProfileAxios";
import SetProfile from "./UpdateProfile";
import Defaultimg from "../assets/profileimg.png";

const Profile = (props) => {
  const { onClose, id } = props || {};
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: '1',
    name: '1',
    email: '1',
    phone: '1',
    preferredGenre: '1',
    password: '1'
  }); // 초기화하기

  const navigate = useNavigate();

  const handleEditProfile = () => {
    setIsEditing(true);
    setTimeout(() => {
      navigate("/profile/edit"); // 프로필 수정 페이지로 이동
    });
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      setIsLoading(true);
      try {
        const response = await getProfile(id);
        const result = await response.json();
        setUserInfo(result); // 서버에서 받은 데이터를 사용
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
    if (onClose) {
      onClose();
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="p-10 border-b-2 border-gray-500 p-2 m-4">
      <h2 className="text-xl font-bold text-center p-22 m-24" style={{ position: 'relative', zIndex: 10 }}>프로필</h2>


        <div className="space-y-3 border-t-2 border-b-2 border-gray-500 p-4 m-4">
          <div className="flex justify-between">
            <label className="font-semibold p-4">이름:</label>
            <span className="ml-auto m-4">{userInfo.name}</span>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold p-4">이메일:</label>
            <span className="ml-auto p-4">{userInfo.email}</span>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold p-4">전화번호:</label>
            <span className="ml-auto p-4">{userInfo.phone}</span>
          </div>
          <div className="flex justify-between">
            <label className="font-semibold p-4">선호 장르:</label>
            <span className="ml-auto p-4">{userInfo.preferredGenre}</span>
          </div>

          <div className="flex justify-between">
            <label className="font-semibold p-4">비밀번호:</label>
            <span className="ml-auto p-4">
              {showPassword ? userInfo.password : "*".repeat(userInfo.password.length)}
            </span>
            <button
              onClick={togglePasswordVisibility}
              className="right-4 text-black-500 border-2 border-gray-500 p-1 m-4 ml-2"
            >
              {showPassword ? "숨기기" : "보기"}
            </button>
          </div>
        </div>
      

      <button
        onClick={handleEditProfile}
        className="border-2 border-gray-500 p-2 mt-4 w-full text-center"
      >
        프로필 수정
      </button>

      {/* 수정 모드일 때만 SetProfile 컴포넌트 렌더링 */}
      {isEditing && (
        <SetProfile 
        userInfo={userInfo} 
        onClose={handleClose} 
        onUpdateProfile={handleUpdateProfile} />
      )}
    </div>
  );
};

export default Profile;