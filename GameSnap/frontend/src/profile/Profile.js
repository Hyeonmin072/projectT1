import React, { useState, useEffect } from "react";
import ProfilePage from '../axios/UserProfileAxios';
import { useNavigate, useHistory } from "react-router-dom";

const Profile = () => {
    // 상태 정의
    const [userInfo, setUserInfo] = useState({
        id: '1',
        name: '1',
        email: '1',
        phone: '1',
        preferredGenre: '1',
        password: 'test123'
      }); // 초기화하기

    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // 컴포넌트가 마운트될 때 프로필 정보를 가져오는 useEffect
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await ProfilePage.getProfile(); // API 호출로 데이터 받아오기
                setUserInfo(response.data); // 받아온 데이터로 userInfo 상태 업데이트
            } catch (error) {
                console.error("프로필 정보를 가져오는 중 오류가 발생했습니다:", error);
            }
        };
        fetchProfile();
    }, []);

    // 비밀번호 표시/숨기기 토글
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // 프로필 수정 화면으로 이동
    const handleEditProfile = () => {
        navigate('/profile/edit');
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div>
            <h2 className="text-2xl font-bold text-center p-22 m-24">프로필</h2>
            </div>
            <div className="space-y-4 p-10 m-15 text-center">
                <div className="flex justify-between items-center">
                <label className="font-semibold">이름:</label>
                <span>{userInfo.name}</span>
                </div>

                <div className="flex justify-between items-center">
                <label className="font-semibold">이메일:</label>
                <span>{userInfo.email}</span>
                </div>

                <div className="flex justify-between items-center">
                <label className="font-semibold">전화번호:</label>
                <span>{userInfo.phone}</span>
                </div>

                <div className="flex justify-between items-center">
                <label className="font-semibold">선호 장르:</label>
                <span>{userInfo.preferredGenre}</span>
                </div>

                <div className="flex justify-between items-center">
                <label className="font-semibold">비밀번호:</label>
                <span>
                    {showPassword ? userInfo.password : "*".repeat(userInfo.password.length)}
                </span>

                <button
                    onClick={togglePasswordVisibility}
                    className="border border-gray-400 p-1 px-3 rounded"
                >
                    {showPassword ? "숨기기" : "보기"}
                </button>
                </div>
            </div>

            <button
                onClick={handleEditProfile}
                className="border border-gray-400 p-2 mt-6 w-full text-center rounded"
            >
                프로필 수정
            </button>
        </div>
    );
}

export default Profile;