/*eslint-disable*/
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
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 게임 이미지 매핑
  const gameImages = {
    '리그오브레전드': LeagueOfLegendImg,
    '스타크래프트': StarCraftImg,
    '로스트아크': LostArkImg,
    '캔디크러쉬사가' : CandyCrashSagaImg,
    '애니팡' : AniPangImg
    // 다른 게임 이미지들 추가
  };

  // 게임 목록 불러오기
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await FreeBoardAxios.getGames();
        console.log('백엔드에서 받아온 게임 데이터:', gamesData);
        const mappedGames = gamesData.map(game => {
          console.log('각 게임 데이터:', game);

          return {
            id: game.id,               
            name: game.name,
            genre: game.genre, 
            image: gameImages[game.name] 
          };
        });
        console.log('매핑된 게임 데이터:', mappedGames);
        setGameCategories(mappedGames);
        // 첫 번째 게임의 장르를 기본값으로 설정
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

  // 게시글 목록 불러오기
  useEffect(() => {
    const fetchPosts = async () => {

      if (!selectedGame) return; // selectedGame이 없으면 요청하지 않음
      
      setLoading(true);
      try {
        let posts;
        if (searchTerm) {
          posts = await FreeBoardAxios.searchPosts(selectedGame, searchTerm);
        } else if (selectedGame === null) {
          posts = await FreeBoardAxios.getPosts();
        } else {
          posts = await FreeBoardAxios.getPosts(selectedGame);
        }
        setPosts(posts || []); // null/undefined 체크
      } catch (error) {
        console.error('게시글을 불러오는데 실패했습니다:', error, posts);
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
            {gameCategories.length > 0 ? (
              gameCategories.map((game, index) => {
                console.log('렌더링되는 게임:', game); // 각 게임 데이터 확인용
                return (
                  <button
                    key={game.id}
                    onClick={() => {
                      console.log('선택된 게임 아아디 : ', game.id); // 클릭 시 선택되는 장르 확인용
                      setSelectedGame(game.id);
                    }}
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
                );
              })
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
        </div>
      </div>
    </PageTransition>
  );
}

export default FreeBoardList;