import React, { useEffect, useState } from 'react';
import Profile from './MainProfile';

const SetProfile = async ({ onClose, onUpdateProfile }) => {
    const { userInfo, setUserInfo } = Profile();
    const [newProfile, setNewProfile] = useState(userInfo || {});
    const [updateStatus, setUpdateStatus ] = useState(null);
    const [isProfileEditing, setIsProfileEditing] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await fetch('/profile');  // userId만 가져오는 경로
                const data = await response.json();
                setUserId(data.userId);  // userId 설정
                fetchUserInfo(data.userId); // userId를 통해 프로필 정보 가져오기
            } catch (error) {
                console.error('Error getting userId');
            }
        };
        fetchUserId();
    }, []);

    const fetchUserInfo = async (id) => {
        try {
            const response = await fetch(`/profile/${id}`);  // userId로 해당 유저 정보 가져오기
            const data = await response.json();
            setUserInfo(data);
            setNewProfile(data);    
        } catch (error) {
            console.error('Error fetching user info');
        }
    };
    
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
        if (!newProfile.name || !newProfile.phone || !newProfile.email) {
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

    const handleSave = () => {
        onUpdateProfile(newProfile);
    }

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
                    name="name"
                    value={userInfo.name}
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
        
            <button onClick={handleSave}>
                저장
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