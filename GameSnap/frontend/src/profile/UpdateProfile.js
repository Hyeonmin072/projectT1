/* eslint-disable */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SetProfile = ({ userInfo = {}, onClose, onUpdateProfile }) => {
const [isVisible, setIsVisible] = useState(false);
const navigate = useNavigate();
  // 사용자 정보를 로컬 상태로 관리
  const [updatedInfo, setUpdatedInfo] = useState({
    name: userInfo.name || "",
    email: userInfo.email || "",
    phone: userInfo.phone || "",
    preferredGenre: userInfo.preferredGenre || "No",
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
    if (typeof onClose === "function") {
        setIsVisible(false);
        setTimeout(() => {
        onClose?.();
        }, 100); // 애니메이션 시간
    }

    navigate("/profile");
    onClose?.();
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg w-full max-w-md p-6 z-60 relative">
        <h2 className="text-xl font-bold text-center mb-6">프로필 수정</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              <option value="Drama">드라마</option>
              <option value="Comedy">코미디</option>
              {/* 추가 장르 옵션 추가 가능 */}
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2"
            >
              취소
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetProfile;
