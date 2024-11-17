import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../axios/UserProfileAxios";
import { useAuth } from "../context/AuthContext";
import { DefalutImage } from "../assets/profile-img"

const SetProfile = () => {
  const { userData, setUserData } = useAuth();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    email: "",
    tel: "",
    likeGamesId: [], // 선택된 게임 ID 저장
    content: "",
    password: "",
  });
  const [gameOptions, setGameOptions] = useState([]); // 게임 리스트 상태
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  // 서버에서 게임 리스트 가져오기
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await ProfilePage.getGameList(); // Axios에서 게임 리스트 호출
        if (response.status === 200) {
          setGameOptions(response.data); // 게임 리스트 저장
        }
      } catch (error) {
        console.error("게임 리스트 불러오기 오류:", error);
      }
    };

    fetchGames();
  }, []);

  // 사용자 데이터 초기화
  useEffect(() => {
    if (userData) {
      setUserInfo({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        tel: userData.tel || "",
        likeGamesId: userData.likeGamesId || [],
        content: userData.content || "",
        password: "",
      });
    } else {
      console.log("유저 데이터를 불러오길 실패하였습니다");
    }
  }, [userData]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    setIsPasswordValid(password === passwordConfirm);
  }, [password, passwordConfirm]);

  const handleCheckboxChange = (gameId) => {
    setUserInfo((prevUserInfo) => {
      const updatedIds = prevUserInfo.likeGamesId.includes(gameId)
        ? prevUserInfo.likeGamesId.filter((id) => id !== gameId)
        : [...prevUserInfo.likeGamesId, gameId];
      return { ...prevUserInfo, likeGamesId: updatedIds };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedUserInfo = {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        tel: userInfo.tel,
        likeGamesId: userInfo.likeGamesId, // 게임 ID 배열로 전송
        content: userInfo.content,
        password: password || "", // 비밀번호가 없으면 빈 문자열
      };
      console.log(updatedUserInfo); 

      const response = await ProfilePage.updateProfile(updatedUserInfo);

      if (response.status === 200) {
        const updatedUserData = { ...userInfo, ...response.data };
        setUserData(updatedUserData);
        alert("프로필이 성공적으로 업데이트되었습니다.");
        navigate("/profile");
      }
    } catch (error) {
      console.error("프로필 업데이트 오류:", error);
      alert("프로필 업데이트 중 문제가 발생했습니다.");
    }
  };
  
  const fileInput = useRef(null);
  // 기본 이미지
  const handleSetDefaultProfile = () => {
    setUserData((prevData) => ({ ...prevData, image: DefalutImage }));
    setShowOptions(false);
  };

  // 내 컴퓨터에서 이미지 가져오기
  const handleOpenFileDialog = () => {
      fileInput.current.click();
      setShowOptions(false); 
  };

  // 프로필 이미지 변경
  const onChangeImage = (e) => {
    if (e.target.files[0]) {
        // 화면에 이미지 출력
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setUserData((prevData) => ({ ...prevData, image: reader.result}));
            }
        };
        reader.readAsDataURL(e.target.files[0])
    }else{
        setImage((prevData) => ({ ...prevData, image: DefalutImage}));
        return
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h2 className="text-2xl font-bold mb-6">프로필 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6 border-t border-b border-gray-300 p-4">
            <div className="flex justify-center items-center p-8">
                <img
                    src={userData?.image}
                    className="w-32 h-32 rounded-full object-cover"
                    onClick={() => setShowOptions(true)}
                />
            </div>
            {/* 프로필 사진 옵션 */}
            {showOptions && (
              <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
                  <h3 className="font-semibold text-lg mb-4">프로필 사진 변경</h3>
                  <button
                      onClick={handleSetDefaultProfile}
                      className="w-full py-2 mb-4 bg-gray-200 text-center rounded"
                  >
                      기본 프로필
                  </button>
                  <button
                      onClick={handleOpenFileDialog}
                      className="w-full py-2 bg-gray-200 text-center rounded"
                  >
                      프로필 사진 가져오기
                  </button>
                  <button
                      onClick={() => setShowOptions(false)}
                      className="absolute top-2 right-2 text-gray-500"
                  >
                      X
                  </button>
                </div>
              </div>
            )}
            <input
                type="file"
                style={{ display: 'none' }}
                accept="image/*"
                name="profile_img"
                onChange={onChangeImage}
                ref={fileInput}
            />
          {/* 이름 필드 */}
          <div className="flex items-center space-x-6">
            <label className="font-semibold w-28">이름:</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none"
            />
          </div>

          {/* 이메일 필드 */}
          <div className="flex items-center space-x-6">
            <label className="font-semibold w-28">이메일:</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none"
            />
          </div>

          {/* 전화번호 필드 */}
          <div className="flex items-center space-x-6">
            <label className="font-semibold w-28">전화번호:</label>
            <input
              type="tel"
              name="tel"
              value={userInfo.tel}
              onChange={(e) =>
                setUserInfo({ ...userInfo, tel: e.target.value })
              }
              className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none"
            />
          </div>

          {/* 선호 게임 체크박스 */}
          <div>
            <label className="font-semibold">선호 게임:</label>
            <div className="flex flex-wrap mt-2">
              {gameOptions.map((game) => (
                <label key={game.id} className="mr-4 flex items-center">
                  <input
                    type="checkbox"
                    checked={userInfo.likeGamesId.includes(game.id)}
                    onChange={() => handleCheckboxChange(game.id)}
                    className="mr-2"
                  />
                  {game.name}
                </label>
              ))}
            </div>
          </div>

          {/* 비밀번호 필드 */}
          <div className="flex items-center space-x-6">
            <label className="font-semibold w-28">비밀번호:</label>
            <input
              type="password"
              placeholder="새로운 비밀번호 입력"
              onChange={(e) => setPassword(e.target.value)}
              className="flex-grow border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex items-center space-x-6">
            <label className="font-semibold w-28">비밀번호 확인:</label>
            <input
              type="password"
              placeholder="비밀번호 확인"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="flex-grow border border-gray-300 rounded-lg p-2"
            />
            {!isPasswordValid && (
              <p className="text-red-500 text-xs mt-1">비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          {/* 자기소개 */}
          <div>
            <label className="font-semibold w-28">소개글:</label>
            <textarea
              value={userInfo.content}
              onChange={(e) =>
                setUserInfo({ ...userInfo, content: e.target.value })
              }
              placeholder="자기소개를 작성해주세요"
              className="flex-grow border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>

        {/* 저장 및 취소 버튼 */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg"
            disabled={!isPasswordValid}
          >
            저장
          </button>
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetProfile;
