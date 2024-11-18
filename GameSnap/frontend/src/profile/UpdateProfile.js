import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../axios/UserProfileAxios";
import { useAuth } from "../context/AuthContext";

const SetProfile = () => {
  const { userData, setUserData } = useAuth();
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    content: "",
    likeGamesId: [], // 선택된 게임 ID 저장
  });
  const [gameOptions, setGameOptions] = useState([]); // 게임 리스트 상태
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
        content: userData.content || "",
        likeGamesId: userData.likeGamesId || [],
      });
    } else {
      console.log("유저 데이터를 불러오길 실패하였습니다");
    }
  }, [userData]);

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

    // 서버로 전송할 데이터 준비
    const likeGamesName = gameOptions
      .filter((game) => userInfo.likeGamesId.includes(game.id))
      .map((game) => game.name);

    try {
      const updatedUserInfo = {
        id: userInfo.id,
        name: userInfo.name,
        content: userInfo.content,
        likeGamesId: userInfo.likeGamesId, // 게임 ID 배열로 전송
        likeGamesName, // 게임 이름 배열로 동적 생성 후 전송
      };

      console.log("전송 데이터:", updatedUserInfo);

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h2 className="text-2xl font-bold mb-6">프로필 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6 border-t border-b border-gray-300 p-4">
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
