import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DefalutImage } from "../assets/profile-img"

const Profile = () => {
  const { userData, setUserData } = useAuth(); // AuthContext에서 데이터 가져오기
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // 비밀번호 표시/숨기기 토글
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 프로필 수정 화면으로 이동
  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">프로필</h2>
        <div className="space-y-4 border-t border-b border-gray-300 p-10 m-15 text-center">
          <div className="relative">
            <div className="flex justify-center items-center p-8">
                <img
                    src={userData?.image}
                    className="w-32 h-32 rounded-full object-cover"
                    onClick={() => handleImageClick}
                />
            </div>

            {isModalOpen && (
              <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <img
                    src={userData.image}
                    alt="Large Profile"
                    className="w-64 h-64 rounded-full object-cover" // 이미지 크게 표시
                  />
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 py-2 px-4 bg-gray-200 rounded"
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* 이름 */}
          <div className="flex justify-between items-center">
            <label className="font-semibold">이름:</label>
            <span>{userData?.name || "정보 없음"}</span>
          </div>

          {/* 이메일 */}
          <div className="flex justify-between items-center">
            <label className="font-semibold">이메일:</label>
            <span>{userData?.email || "정보 없음"}</span>
          </div>

          {/* 전화번호 */}
          <div className="flex justify-between items-center">
            <label className="font-semibold">전화번호:</label>
            <span>{userData?.tel || "정보 없음"}</span>
          </div>

          {/* 선호 장르 */}
          <div className="flex justify-between items-center">
            <label className="font-semibold">선호 게임:</label>
            <span>
              {userData?.preferredGame?.length
                ? userData.preferredGame.join(", ")
                : "정보 없음"}
            </span>
          </div>

          {/* 비밀번호 */}
          <div className="flex justify-between items-center">
            <label className="font-semibold">비밀번호:</label>
            <span>
              {showPassword
                ? userData?.password || "정보 없음"
                : "*".repeat(userData?.password?.length || 8)}
            </span>
            <button
              onClick={togglePasswordVisibility}
              className="text-sm text-green-500 hover:text-green-700 px-3 py-1 rounded border border-green-500"
            >
              {showPassword ? "숨기기" : "보기"}
            </button>
          </div>
        </div>

        {/* 프로필 수정 버튼 */}
        <button
          onClick={handleEditProfile}
          className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all duration-200"
        >
          프로필 수정
        </button>
      </div>
    </div>
  );
};

export default Profile;
