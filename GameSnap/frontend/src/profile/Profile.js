import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DefalutImage } from "../assets/profile-img"

const Profile = () => {
  const { userData, setUserData } = useAuth(); // AuthContext에서 데이터 가져오기
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

  // 프로필 이미지 변경
  const onChangeImage = (e) => {
    if (e.target.files[0]) {
        // 화면에 이미지 출력
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setUserData((prevData) => ({ ...prevData, image: reader.result}));
            }
        };
        reader.readAsDataURL(e.target.files[0])
    }else{
        setImage((prevData) => ({ ...prevData, image: DefalutImage}));
        return
    }
  }

  // 기본 이미지
  const handleSetDefaultProfile = () => {
      setUserData((prevData) => ({ ...prevData, image: DefalutImage }));
      setShowOptions(false);
  };

  // 내 컴퓨터에서 이미지 가져오기
  const handleOpenFileDialog = () => {
      fileInput.current.click();
      setShowOptions(false); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">프로필</h2>
        <div className="space-y-4 border-t border-b border-gray-300 p-10 m-15 text-center">
          <div className="relative">
            <div className="flex justify-center items-center p-8">
                <img
                    src={userData.image}
                    className="w-32 h-32 rounded-full object-cover"
                    onClick={() => setShowOptions(true)}
                />
            </div>

            {/* 프로필 사진 옵션 */}
            {showOptions && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
                        <h3 className="font-semibold text-lg mb-4">프로필 사진 변경</h3>
                        <button
                            onClick={handleSetDefaultProfile}
                            className="w-full py-2 mb-4 bg-gray-200 text-center rounded"
                        >
                            기본 프로필
                        </button>
                        <button
                            onClick={handleOpenFileDialog}
                            className="w-full py-2 bg-gray-200 text-center rounded"
                        >
                            프로필 사진 가져오기
                        </button>
                        <button
                            onClick={() => setShowOptions(false)}
                            className="absolute top-2 right-2 text-gray-500"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
            <input
                type="file"
                style={{ display: 'none' }}
                accept="image/*"
                name="profile_img"
                onChange={onChangeImage}
                ref={fileInput}
            />
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
