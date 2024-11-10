/* eslint-disable */

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SetProfile = ({ userInfo = {}, onClose, onUpdateProfile }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const profileRef = useRef(null); // 프로필 영역을 참조하기 위한 ref
  const [image, setImage] = useState(null);
  
  // 사용자 정보를 로컬 상태로 관리
  const [updatedInfo, setUpdatedInfo] = useState({
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    preferredGenre: userInfo.preferredGenre,
  });

  // 입력 필드 변경 시 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // 폼 제출 시 부모 컴포넌트에 업데이트된 정보를 전달
  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onUpdateProfile == "function") {
      onUpdateProfile(updatedInfo);    
    }
     
    navigate("/profile");
    window.close();
  };

  const handleCancel = () => {
    setIsVisible(false);
    setIsEditing(false);
    setTimeout(() => {
      onClose?.();
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];  // 선택된 파일
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setImage(reader.result);  // 이미지 URL을 상태에 저장
      };

      reader.readAsDataURL(file);  // 파일을 데이터 URL 형식으로 읽음
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" 
      onClick={handleCancel} 
      />
      <div ref={profileRef} className="bg-white rounded-lg w-full max-w-md p-6 z-60 relative">
        <h2 className="text-xl font-bold text-center mb-6">프로필 수정</h2>

        <label className="block font-semibold">프로필 이미지 </label>
        <label className="profile-setting-main-profile-change-add-img" htmlFor="input-file">
            <input
                type="file"
                accept="image/*"
                id="input-file"
                className="profile-setting-main-profile-change-add-img-input"
                onchange={handleFileChange}  // 파일 선택 시 미리보기 함수 호출 
            />
        </label>


        <img id="image-preview" src="" alt="프로필 이미지 미리보기"
        className="hidden w-32 h-32 rounded-full object-cover" />


        <div className="space-y-4">
          <div>
            <label className="block font-semibold">이름:</label>
            <input
              type="text"
              name="name"
              value={updatedInfo.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div>
            <label className="block font-semibold">이메일:</label>
            <input
              type="email"
              name="email"
              value={updatedInfo.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div>
            <label className="block font-semibold">전화번호:</label>
            <input
              type="tel"
              name="phone"
              value={updatedInfo.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          <div>
            <label className="block font-semibold">선호 장르:</label>
            <select
              name="preferredGenre"
              value={updatedInfo.preferredGenre}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="No">선호 장르 없음</option>
              <option value="Action">액션</option>
              <option value="STRATEGY">드라마</option>
              <option value="SPORTS">스포츠</option>
              <option value="SIMULATION">시뮬레이션</option>
              <option value="CASUAL">캐주얼</option>
              <option value="MOBA">모바..?</option>
              <option value="RACING">레이싱</option>
              <option value="PUZZLE">퍼즐/추리</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel} // 닫기 버튼 클릭 시 onClose 호출
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 
                          transition-colors duration-200"
              >
              ✕
            </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
              >
                저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetProfile;
