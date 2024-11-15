import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { userData } = useAuth(); // AuthContext에서 데이터 가져오기
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // 비밀번호 표시/숨기기 토글
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 프로필 수정 화면으로 이동
  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">프로필</h2>

        <div className="space-y-4">
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
