import React, { useState, useEffect } from "react";
import ProfilePage from "../axios/UserProfileAxios";
import { useNavigate } from "react-router-dom";

const SetProfile = ({ id, token }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState("");
  const [previewImageSrc, setPreviewImageSrc] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [userInfo, setUserInfo] = useState({
    id: '1',
    name: '',
    email: '',
    phone: '',
    preferredGenre: '',
    password: ''
  });
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo.id) {
        navigate('/user');
        return;
      }

      try {
        const response = await ProfilePage.getProfile(id);
        if (!response.id) {
          navigate('/user');
          return;
        }

        setUserInfo({
          id: response.id,
          name: response.name,
          email: response.email,
          phone: response.phone,
          preferredGenre: response.preferredGenre,
          password: response.password,
        });

      }catch (error) {
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isPasswordValid) {
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      return;
    }
  
    try {
      const response = await ProfilePage.updateProfile(id, {
        ...userInfo,
        password: password || userInfo.password, 
      }, token);
  
      if (response.status === 200) {
        alert("프로필이 성공적으로 업데이트되었습니다.");
        navigate("/profile"); // 프로필 페이지로 이동
      } else {
        alert("프로필 업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("프로필 업데이트 중 오류 발생:", error);
      alert("프로필 업데이트 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
    
      <h2 className="text-2xl font-bold mb-6">프로필 수정</h2>
    
      <form onSubmit={handleSubmit}>
        <div className="space-y-6 border-t border-b border-gray-300 p-4">
          {/* 입력 필드와 레이블을 수평으로 정렬 */}
          <div className="flex items-center space-x-6">
            <label className="font-semibold w-28">이름:</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-6">
            <label className="font-semibold w-28">이메일:</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-6">
            <label className="font-semibold w-28">전화번호:</label>
            <input
              type="tel"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-6">
            <label className="font-semibold w-28">선호 장르:</label>
            <select
              name="preferredGenre"
              value={userInfo.preferredGenre}
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
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            저장
          </button>
          <button
          type="button"
            onClick={() => navigate('/profile')} // 뒤로 가기 버튼
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetProfile;
