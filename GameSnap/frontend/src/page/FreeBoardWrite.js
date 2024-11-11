/*eslint-disable*/
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageTransition from '../component/PageTransition';
import FreeBoardAxios from '../axios/FreeBoardAxios';
import { useAuth } from '../context/AuthContext'



function FreeBoardWrite() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [gameOptions, setGameOptions] = useState([]); // 게임 게시판 옵션 상태 추가
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    userId: userData?.id || '',
    gameId: '' // 게임 게시판 선택을 위한 필드 추가
  });

// 게임 게시판 목록 가져오기 (예: API 호출) 
useEffect(() => {
  async function fetchGames() {
    try {
      const games = await FreeBoardAxios.getGames();
      setGameOptions(games);
    } catch (error) {
      console.error('게임 목록 로딩 실패 :', error)
    }
  }
  fetchGames();
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('게시글 전송:');
    console.log('title:', formData.title);
    console.log('content:', formData.content);
    console.log('userId:', formData.userId);
    console.log('gameId:', formData.gameId);
    savePostData(); //게시글 저장 로직
    navigate('/board');
  };

  const savePostData = async () => {
    try {
      const data = await FreeBoardAxios.createPost(formData);
      console.log('게시글이 성공적으로 저장되었습니다 : ', data);
    } catch (error) {
      console.error('게시글 저장 중 오류 발생 : ', error)
    }
  };


  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              돌아가기
            </button>
            <h1 className="text-2xl font-bold text-gray-800">게시글 작성</h1>
          </div>

          {/* 작성 폼 */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
            <div className="mb-6"> 
              <label htmlFor="game" className="block text-gray-700 font-medium mb-2" > 
                게임 게시판 선택 
              </label> 
              <select 
              id="game" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" 
              value={formData.gameId} 
              onChange={(e) => setFormData({...formData, gameId: e.target.value})} 
              required 
              > 
              <option value="">게시판을 선택하세요</option> 
              {gameOptions.map(game => ( 
                <option key={game.id} value={game.id}> 
                  {game.name} 
                </option> 
              ))} 
              </select>
            </div>
            <div className="mb-6">
              <label 
                htmlFor="title" 
                className="block text-gray-700 font-medium mb-2"
              >
                제목
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="제목을 입력하세요"
                required
              />
            </div>

            <div className="mb-6">
              <label 
                htmlFor="content" 
                className="block text-gray-700 font-medium mb-2"
              >
                내용
              </label>
              <textarea
                id="content"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 min-h-[300px]"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="내용을 입력하세요"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}

export default FreeBoardWrite;