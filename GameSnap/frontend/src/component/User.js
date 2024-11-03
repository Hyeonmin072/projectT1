import React, { useState } from "react";

const User = () => {
  // 유저 프로필 상태 정의
  const [userInfo, setUserInfo] = useState({
    userid: '',
    username: '',
    email: '',
    phone: '',
    password: "",
    preferredGenre: "No", // 기본 선호 장르
    notifications: true,
  });

  // 편집 모드 상태
  const [isEditing, setIsEditing] = useState(false);

  // 입력 값 변경 처리 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // 알림 설정 토글
  const toggleNotifications = () => {
    setUserInfo({
      ...userInfo,
      notifications: !userInfo.notifications,
    });
  };

  // 프로필 저장 처리
  const handleSave = (e) => {
    e.preventDefault();
    // 저장 로직 추가 가능 (예: API 호출)
    console.log("User Info saved:", userInfo);
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      <h2>프로필</h2>
      <form onSubmit={handleSave}>
        <div style={styles.field}>
          <label>아이디:</label>
          {isEditing ? (
            <input
              type="text"
              name="userid"
              value={userInfo.userid}
              onChange={handleChange}
              required
            />
          ) : (
            <span>{userInfo.userid}</span>
          )}
        </div>
        <div style={styles.field}>
          <label>이름:</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
              required
            />
          ) : (
            <span>{userInfo.username}</span>
          )}
        </div>
        <div style={styles.field}>
          <label>이메일:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              required
            />
          ) : (
            <span>{userInfo.email}</span>
          )}
        </div>
        <div style={styles.field}>
          <label>전화번호:</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              required
            />
          ) : (
            <span>{userInfo.phone}</span>
          )}
        </div>
        <div style={styles.field}>
          <label>비밀번호:</label>
          {isEditing ? (
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              required
            />
          ) : (
            <span>*****</span> // 비밀번호는 보안상 표시하지 않음
          )}
        </div>
        <div style={styles.field}>
          <label>선호 장르:</label>
          {isEditing ? (
            <select
              name="preferredGenre"
              value={userInfo.preferredGenre}
              onChange={handleChange}
            >
              <option value="NO">NO</option>
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
          ) : (
            <span>{userInfo.preferredGenre}</span>
          )}
        </div>
        <div style={styles.field}>
          <label>Enable Notifications:</label>
          <button type="button" onClick={toggleNotifications}>
            {userInfo.notifications ? "On" : "Off"}
          </button>
        </div>
        <div style={styles.actions}>
          {isEditing ? (
            <button type="submit">저장</button>
          ) : (
            <button type="button" onClick={() => setIsEditing(true)}>
              프로필 수정 완료
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// 스타일 객체
const styles = {
  container: {
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  field: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
  },
  actions: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

export default User;
