import React, { useState } from 'react';

const SetProfile = async ({currentProfile, onClose, setProfile }) => {
    const [newProfile, setNewProfile] = useState(currentProfile);
    const [updateStatus, setUpdateStatus ] = useState(null);
    const [isProfileEditing, setIsProfileEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProfile({
          ...newProfile,
          [name]: value,
        });
      };

    const handleGenreChange = (e) => {
        const { value } = e.target;
        setNewProfile({
        ...newProfile,
        preferredGenre: value,
        });
    };

    // 프로필 수정 버튼 클릭 시, 프로필 수정 모달 열기
    const handleEditProfile = () => {
        setIsProfileEditing(true);
    };

    // 프로필 수정 모달 닫기
    const handleCloseProfile = () => {
        setIsProfileEditing(false);
    };

    const handleProfileUpdate = (updatedProfile) => {
        setProfile(updatedProfile);
    };

    const updateProfileHandler = async () => {
        try {
            const response = await fetch(`/updateProfile`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProfile)
            });
            if (response.ok) {
                return { success: true, message: " 프로필이 정상적으로 업데이트 되었습니다. "};
            } else {
                return { success: false, message: " 프로필 업데이트에 실패했습니다. "};
            }
        } catch (error) {
            return { success: false, message: `프로필 업데이트 중 오류 발생: ${error.message}` };
        }
    }
    
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <div 
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={onClose} // 닫기 버튼 클릭 시 onClose 호출
            />
            <h2>프로필 수정</h2>
            <input
                type="text"
                name="name"
                value={newProfile.name}
                onChange={handleInputChange}
                placeholder="이름을 입력하세요"
            />
            <input
                type="phone"
                name="phone"
                value={newProfile.phone}
                onChange={handleInputChange}
                placeholder="전화번호를 입력하세요"
            />
            <input
                type="email"
                name="email"
                value={newProfile.email}
                onChange={handleInputChange}
                placeholder="이메일을 입력하세요"
            />

            {/* 선호 장르 선택 */}
            <select
                name="preferredGenre"
                value={newProfile.preferredGenre}
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
        
            <button onClick={updateProfileHandler}>
                프로필 수정 완료
            </button>
            {updateStatus && (
                <div style={{color: updateStatus.success ? 'green' : 'red'}}>
                    {updateStatus.message}
                </div>
            )}

            {/* 닫기 버튼 */}
            <button onClick={onClose}>닫기</button>
        </div>
    );
};

export default SetProfile;