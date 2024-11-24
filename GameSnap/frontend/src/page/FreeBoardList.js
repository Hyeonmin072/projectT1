import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import PageTransition from '../component/PageTransition';
import FreeBoardAxios from '../axios/FreeBoardAxios';
import LeagueOfLegendImg from '../assets/lol.png';
import StarCraftImg from '../assets/starcraft.png';
import LostArkImg from '../assets/lostark.png';
import CandyCrashSagaImg from '../assets/candycrashsaga.png';
import AniPangImg from '../assets/anipang.png';

function FreeBoardList() {
  
  const [gameCategories, setGameCategories] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 실제 검색어 상태
  const [tempSearchTerm, setTempSearchTerm] = useState(""); // 임시 검색어 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const gameImages = {
    '리그오브레전드': LeagueOfLegendImg,
    '스타크래프트': StarCraftImg,
    '로스트아크': LostArkImg,
    '캔디크러쉬사가': CandyCrashSagaImg,
    '애니팡': AniPangImg,
  };

  useEffect(() => {
    // 게시판 이동 시 검색어 초기화 및 페이지 0으로 설정
    setSearchTerm(""); // 검색어 초기화
    setTempSearchTerm(""); // 임시 검색어 초기화
    setPage(0); // 페이지 0으로 리셋
  }, [selectedGame]); // selectedGame이 변경될 때마다 실행
  

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await FreeBoardAxios.getGames();
        const mappedGames = gamesData.map(game => ({
          id: game.id,
          name: game.name,
          genre: game.genre,
          image: gameImages[game.name]
        }));
        setGameCategories(mappedGames);
        if (mappedGames.length > 0) {
          setSelectedGame(mappedGames[0].id);
        }
      } catch (error) {
        console.error('게임 목록을 불러오는데 실패했습니다:', error);
        setError('게임 목록을 불러오는데 실패했습니다.');
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!selectedGame) return;
      setLoading(true);
      try {
        const boardsData = searchTerm
          ? await FreeBoardAxios.searchPosts(selectedGame, searchTerm, page, pageSize)
          : await FreeBoardAxios.getPosts(selectedGame, page, pageSize);

        setPosts(boardsData.content || []);
        setTotalPages(boardsData.totalPages);
      } catch (error) {
        console.error('게시글을 불러오는데 실패했습니다:', error);
        setError('게시글을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [selectedGame, searchTerm, page, pageSize]);

  const handleSearch = async (e) => {
    e.preventDefault();

    // 검색어가 공백만 포함된 경우에는 검색을 실행하지 않음
    if (!tempSearchTerm.trim()) {
      alert("검색어를 입력해주세요."); // 공백만 입력한 경우 경고 메시지
      return; // 검색을 막음
    }

    setSearchTerm(tempSearchTerm); // 임시 검색어를 실제 검색어로 설정
    setPage(0); // 새로운 검색 시 페이지를 0으로 리셋
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">자유게시판</h1>
          </div>

          <div className="flex justify-between items-center mb-6">
            <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                value={tempSearchTerm}
                onChange={(e) => setTempSearchTerm(e.target.value)} // 임시 검색어 상태 업데이트
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-green-500 text-white rounded-lg px-4 py-1 hover:bg-green-800 transition-colors"
              >
                검색
              </button>
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
            {gameCategories.length > 0 ? (
              gameCategories.map((game, index) => (
                <button
                  key={game.id}
                  onClick={() => setSelectedGame(game.id)}
                  className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2
                    ${selectedGame === game.id
                      ? 'bg-white text-black border-green-500'
                      : 'border-gray-300 hover:bg-green-400 transition duration-500 ease-in-out'
                    }`}
                >
                  {game.image && (
                    <img 
                      src={game.image} 
                      alt={game.name} 
                      className="w-6 h-6 rounded object-cover"
                    />
                  )}
                  {game.name || '알 수 없는 게임'}
                </button>
              ))
            ) : (
              <div>게임 목록을 불러오는 중...</div>
            )}
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
                  <span className="col-span-5">제목</span>
                  <span className="col-span-2 text-center">작성자</span>
                  <span className="col-span-2 text-center">작성일</span>
                  <span className="col-span-1 text-center">조회</span>
                  <span className="col-span-1 text-center">좋아요</span>
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
                        className="col-span-5 text-gray-800 hover:text-green-500"
                      >
                        {post.title}
                      </Link>
                      <span className="col-span-2 text-center text-gray-600">
                        {post.memberName}
                      </span>
                      <span className="col-span-2 text-center text-gray-500">
                        {post.createDate}
                      </span>
                      <span className="col-span-1 text-center text-gray-500">
                        {post.view}
                      </span>
                      <span className="col-span-1 text-center text-gray-500">
                        {post.like}
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
          
          <div className="flex justify-center mt-6">
            {/* 이전 버튼 */} 
            <button 
              onClick={() => handlePageChange(page - 1)} 
              className={`px-4 py-2 mx-1 rounded-lg ${page === 0 ? 'bg-gray-200 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`} 
              disabled={page === 0}
            > 
              이전 
            </button>
            {/* 페이징 버튼 */} 
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index)}
                className={`px-4 py-2 mx-1 rounded-lg ${index === page ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
              >
                {index + 1}
              </button>
            ))}
            {/* 다음 버튼 */}
            <button 
              onClick={() => handlePageChange(page + 1)} 
              className={`px-4 py-2 mx-1 rounded-lg ${page === totalPages - 1 ? 'bg-gray-200 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`} 
              disabled={page === totalPages - 1}
            > 
              다음 
            </button> 
          </div>
          
        </div>
      </div>
    </PageTransition>
  );
}

export default FreeBoardList;
