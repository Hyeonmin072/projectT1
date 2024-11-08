import React, { useEffect, useState } from 'react';
import Profile from './MainProfile';

const SetProfile = async ({ onClose }) => {
    const { userInfo, setUserInfo } = useState(null);
    const [newProfile, setNewProfile] = useState({});
    const [updateStatus, setUpdateStatus ] = useState(null);
    const [isProfileEditing, setIsProfileEditing] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('/getUserInfo');
                const data = await response.json();
                setUserInfo(data);
                setNewProfile(data);
            } catch (error) {
                
            }
        };
        fetchUserInfo();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProfile((prevProfile) => ({
          ...prevProfile,
          [name]: value
        }));
      };

    const handleGenreChange = (e) => {
        const { value } = e.target;
        setNewProfile((prevProfile) => ({
        ...prevProfile,
        preferredGenre: value,
        }));
    };

    // 프로필 수정 버튼 클릭 시, 프로필 수정 열기
    const handleEditProfile = () => {
        setIsProfileEditing(true);
    };

    const handleUpdateClick = async () => {
        // 유효성 검사
        if (!newProfile.username || !newProfile.phone || !newProfile.email) {
            setUpdateStatus({ success: false, message: "모든 필드를 입력해 주세요." });
            return;
        }
            try { 
                const response = await fetch('/updateProfile', { 
                    method: 'POST', 
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newProfile) 
                }); 
                
            if (response.ok) { 
                setUpdateStatus({ success: true, message: "프로필이 성공적으로 업데이트되었습니다." }); 
            } else { 
                setUpdateStatus({ success: false, message: "프로필 업데이트에 실패했습니다." }); 
            } 
        } catch (error) { 
            setUpdateStatus({ success: false, message: `프로필 업데이트 중 오류 발생: ${error.message}` }); 
        }
    };

    // 프로필 수정 닫기
    const handleCloseProfile = () => {
        setIsProfileEditing(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div 
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={onClose} // 닫기 버튼 클릭 시 onClose 호출
            />
            <h2 className="text-xl font-semibold mb-4">프로필 수정</h2>
            <div className="space-y-3 border-t-2 border-b-2 border-gray-500 p-2 m-4">
                <input
                    type="text"
                    name="username"
                    value={userInfo.username}
                    onChange={handleInputChange}
                    placeholder="이름을 입력하세요"
                />
                <input
                    type="phone"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                    placeholder="전화번호를 입력하세요"
                />
                <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    placeholder="이메일을 입력하세요"
                />

                {/* 선호 장르 선택 */}
                <select
                    name="preferredGenre"
                    value={userInfo.preferredGenre}
                    onChange={handleGenreChange}
                >
                    <option value="NO">선호 장르 선택</option>
                    <option value="RPG">RPG</option>
                    <option value="ACTION">ACTION</option>
                    <option value="STRATEGY">STRATEGY</option>
                    <option value="SPORTS">SPORTS</option>
                    <option value="SIMULATION">SIMULATION</option>
                    <option value="CASUAL">CASUAL</option>
                    <option value="MOBA">MOBA</option>
                    <option value="RACING">RACING</option>
                    <option value="PUZZLE">PUZZLE</option>
                </select>
            </div>
        
            <button onClick={handleUpdateClick}>
                프로필 수정 완료
            </button>
            {updateStatus && (
                <div style={{color: updateStatus.success ? 'green' : 'red'}}>
                    {updateStatus.message}
                </div>
            )}

            {/* 닫기 버튼 */}
            <button onClick={onClose}
            className="absolute right-4 bottom-4 text-black-500
            border-2 border-gray-500 p-1">
            닫기
            </button>
        </div>
    );
};

export default SetProfile;