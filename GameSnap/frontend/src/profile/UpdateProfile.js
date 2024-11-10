import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SetProfile = ({ userInfo = {}, onClose, onUpdateProfile }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const profileRef = useRef(null); // 프로필 영역을 참조하기 위한 ref
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');  // 비밀번호 상태와 함수 정의
  const [passwordConfirm, setPasswordConfirm] = useState('');  // 비밀번호 확인 상태와 함수 정의
  const [isPasswordValid, setIsPasswordValid] = useState(true);  // 비밀번호 확인이 유효한지 여부
  
  // 비밀번호 확인 입력 처리 함수
  const onChangePW = (event) => {
    setPasswordConfirm(event.target.value);  // 입력된 값으로 passwordConfirm 상태 업데이트
    // 비밀번호와 비밀번호 확인이 일치하는지 검사
    if (password === event.target.value) {
      setIsPasswordValid(true); // 일치하면 유효
    } else {
      setIsPasswordValid(false); // 불일치하면 유효하지 않음
    }
  };

  const onSetPW = (event) => {
    setPassword(event.target.value); // 비밀번호 입력 상태 업데이트
  };

  // 사용자 정보를 로컬 상태로 관리
  const [updatedInfo, setUpdatedInfo] = useState({
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    preferredGenre: userInfo.preferredGenre,
    password: userInfo.password
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      alert('비밀번호가 일치하지 않습니다.');
      return; // 비밀번호가 일치하지 않으면 폼을 제출하지 않음
    }

    try {
      const updatedData = {
        ...updatedInfo, // 여기에 업데이트할 정보 넣기
        password: password, // 비밀번호도 업데이트
      };
      
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error('프로필 업데이트 실패');
      }
    

    if (typeof onUpdateProfile == "function") {
      onUpdateProfile(updatedInfo);    
    }
    
    onClose?.();
    } finally {
      onclose?.();
    }

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

  useEffect(() => {
    setPassword('') ;
    setPasswordConfirm('');
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50" 
      onClick={onClose} 
      />
      <div ref={profileRef} className="bg-white rounded-lg w-full max-w-md p-10 z-60 relative">
        <h2 className="text-xl font-bold text-center mb-6">프로필 수정</h2>

        <div className="space-y-4 border-t-2 border-b-2 border-gray-500 p-2 m-3">
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

          <div>
            <label className="block font-semibold">비밀번호</label>
            <input
              type="password"
              placeholder="새로운 비밀번호 입력"
              onChange={onSetPW}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>            
          <div>
            <label className="block font-semibold">비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호 확인"
              onChange={onChangePW}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {!isPasswordValid && (
            <label style={{color: "red"}}>비밀번호가 일치하지 않습니다.</label>
          )}
        </div>

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
          className="absolute right-4 bottom-2 bg-blue-500 text-white px-4 py-2 
          rounded hover:bg-blue-600 transition-colors duration-200 "
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default SetProfile;
