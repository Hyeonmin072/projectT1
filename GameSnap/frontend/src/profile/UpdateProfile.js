import React, { useState, useEffect } from "react";
import { updateProfile } from "../axios/UserProfileAxios";

const SetProfile = ({ userInfo = {}, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(userInfo.profileImage); // 기존 프로필 이미지 URL을 초기값으로 설정
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // 비밀번호 확인 입력 처리 함수
  const onChangePW = (event) => {
    setPasswordConfirm(event.target.value);
    if (password && password === event.target.value) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const onSetPW = (event) => {
    setPassword(event.target.value);
  };

  const [updatedInfo, setUpdatedInfo] = useState({
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    preferredGenre: userInfo.preferredGenre,
    password: userInfo.password
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      // 비밀번호 불일치 처리
      return;
    }

    try {
      const updatedData = {
        ...updatedInfo,
        password: password,
      };
      
      const response = await updateProfile('/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error('프로필 업데이트 실패');
      }

      if (typeof onUpdateProfile === "function") {
        onUpdateProfile(updatedInfo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPassword('');
    setPasswordConfirm('');
  }, []);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">프로필 수정</h2>

      <div className="space-y-6 border-t border-b border-gray-300 p-4">
        {/* 입력 필드와 레이블을 수평으로 정렬 */}
        <div className="flex items-center space-x-6">
          <label className="font-semibold w-28">이름:</label>
          <input
            type="text"
            name="name"
            value={updatedInfo.name}
            onChange={handleChange}
            className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-6">
          <label className="font-semibold w-28">이메일:</label>
          <input
            type="email"
            name="email"
            value={updatedInfo.email}
            onChange={handleChange}
            className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-6">
          <label className="font-semibold w-28">전화번호:</label>
          <input
            type="tel"
            name="phone"
            value={updatedInfo.phone}
            onChange={handleChange}
            className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-6">
          <label className="font-semibold w-28">선호 장르:</label>
          <select
            name="preferredGenre"
            value={updatedInfo.preferredGenre}
            onChange={handleChange}
            className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <div className="flex items-center space-x-6">
          <label className="font-semibold w-28">비밀번호:</label>
          <input
            type="password"
            placeholder="새로운 비밀번호 입력"
            onChange={onSetPW}
            className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-6">
          <label className="font-semibold w-28">비밀번호 확인:</label>
          <input
            type="password"
            placeholder="비밀번호 확인"
            onChange={onChangePW}
            className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 비밀번호 불일치 메시지 */}
        {!isPasswordValid && (
          <div className="text-red-500 mt-2">비밀번호가 일치하지 않습니다.</div>
        )}
      </div>

      <div className="flex justify-end space-x-4 mt-8">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          저장
        </button>
        <button
          onClick={() => window.history.back()} // 뒤로 가기 버튼
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200"
        >
          취소
        </button>
      </div>
    </div>

  );
};

export default SetProfile;
