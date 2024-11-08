/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import PageTransition from '../component/PageTransition';
import FreeBoardAxios from '../axios/FreeBoardAxios';
import LeagueOfLegendImg from '../assets/lol.png';

function FreeBoardList() {
  const [gameCategories, setGameCategories] = useState([1]);
  const [selectedGame, setSelectedGame] = useState("MOBA");
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 게임 이미지 매핑
  const gameImages = {
    '리그오브레전드': LeagueOfLegendImg,
    // 다른 게임 이미지들 추가
  };

  // 게임 목록 불러오기
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await FreeBoardAxios.getGames();
        const mappedGames = gamesData.map(game => ({
          g_genre: game.g_genre,  // ID 대신 g_genre 사용
          g_name: game.g_name,
          image: gameImages[game.g_name]
        }));
        setGameCategories(mappedGames);
        // 첫 번째 게임의 장르를 기본값으로 설정
        if (mappedGames.length > 0) {
          setSelectedGame(mappedGames[0].g_genre);
        }
      } catch (error) {
        console.error('게임 목록을 불러오는데 실패했습니다:', error);
        setError('게임 목록을 불러오는데 실패했습니다.');
      }
    };
  
    fetchGames();
  }, []);

  // 게시글 목록 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      if (!selectedGame) return; // selectedGame이 없으면 요청하지 않음
      
      setLoading(true);
      try {
        let posts;
        if (searchTerm) {
          posts = await FreeBoardAxios.searchPosts(selectedGame, searchTerm);
        } else {
          posts = await FreeBoardAxios.getPosts(selectedGame);
        }
        setPosts(posts || []); // null/undefined 체크
      } catch (error) {
        console.error('게시글을 불러오는데 실패했습니다:', error);
        setError('게시글을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, [selectedGame, searchTerm]);

  // 검색 핸들러
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const searchResults = await FreeBoardAxios.searchPosts(selectedGame, searchTerm);
      setPosts(searchResults);
    } catch (error) {
      setError('검색에 실패했습니다.');
    }
  };

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          {/* 헤더 */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">자유게시판</h1>
          </div>

          {/* 검색 및 글쓰기 버튼 */}
          <div className="flex justify-between items-center mb-6">
            <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </form>
            <Link
              to="/board/write"
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-800 transition-colors"
            >
              <Plus size={20} className="mr-2" />
              글쓰기
            </Link>
          </div>

          {/* 게임 카테고리 버튼 */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {gameCategories.map((game, index) => (
              <button
                key={game.g_genre || index}  // g_genre나 index를 key로 사용
                onClick={() => setSelectedGame(game.g_genre)}
                className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2
                  ${selectedGame === game.g_genre
                    ? 'bg-white text-black border-green-500'
                    : 'border-gray-300 hover:bg-white'
                  }`}
              >
                {game.image && (
                  <img 
                    src={game.image} 
                    alt={game.g_name} 
                    className="w-6 h-6 rounded object-cover"
                  />
                )}
                {game.g_name}
              </button>
            ))}
          </div>

          {/* 게시글 목록 */}
          <div className="bg-white rounded-lg shadow">
            {loading ? (
              <div className="text-center p-4">로딩 중...</div>
            ) : (
              <div className="divide-y">
                {/* 헤더 */}
                <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 font-medium text-gray-600">
                  <span className="col-span-1 text-center">번호</span>
                  <span className="col-span-6">제목</span>
                  <span className="col-span-2 text-center">작성자</span>
                  <span className="col-span-2 text-center">작성일</span>
                  <span className="col-span-1 text-center">조회</span>
                </div>

                {/* 게시글 목록 */}
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div key={post.id} className="grid grid-cols-12 px-6 py-4 hover:bg-gray-50">
                      <span className="col-span-1 text-center text-gray-500">
                        {post.id}
                      </span>
                      <Link 
                        to={`/board/${post.id}`}
                        className="col-span-6 text-gray-800 hover:text-green-500"
                      >
                        {post.title}
                      </Link>
                      <span className="col-span-2 text-center text-gray-600">
                        {post.author}
                      </span>
                      <span className="col-span-2 text-center text-gray-500">
                        {post.date}
                      </span>
                      <span className="col-span-1 text-center text-gray-500">
                        {post.views}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4 text-gray-500">
                    게시글이 없습니다.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default FreeBoardList;