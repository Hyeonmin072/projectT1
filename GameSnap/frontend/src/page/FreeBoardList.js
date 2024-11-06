/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import PageTransition from '../component/PageTransition';

function FreeBoardList() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "첫 번째 게시글입니다",
      author: "사용자1",
      date: "2024-01-05",
      views: 42,
      likes: 5,
    },
    {
      id: 2,
      title: "안녕하세요 반갑습니다",
      author: "사용자2",
      date: "2024-01-05",
      views: 28,
      likes: 3,
    },
    // ... 더미 데이터
  ]);

  const [searchTerm, setSearchTerm] = useState("");

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
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <Link
                to="/board/write"
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-800 transition-colors"
              >
                <Plus size={20} className="mr-2" />
                글쓰기
              </Link>
            </div>

            {/* 게시글 목록 */}
            <div className="bg-white rounded-lg shadow">
              <div className="divide-y">
                {/* 헤더 */}
                <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 font-medium text-gray-600">
                  <span className="col-span-1 text-center">번호</span>
                  <span className="col-span-6">제목</span>
                  <span className="col-span-2 text-center">작성자</span>
                  <span className="col-span-2 text-center">작성일</span>
                  <span className="col-span-1 text-center">조회</span>
                </div>

                {/* 게시글 행 */}
                {posts.map((post) => (
                  <div key={post.id} className="grid grid-cols-12 px-6 py-4 hover:bg-gray-50">
                    <span className="col-span-1 text-center text-gray-500">
                      {post.id}
                    </span>
                    <Link 
                      to={`/board/${post.id}`}
                      className="col-span-6 text-gray-800 hover:text-blue-500"
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
                ))}
              </div>

              {/* 페이지네이션 */}
              <div className="px-6 py-4 border-t flex justify-center">
                <nav className="flex space-x-2">
                  <button className="px-3 py-1 border rounded hover:bg-gray-300">
                    이전
                  </button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`px-3 py-1 border rounded 
                        ${page === 1 
                          ? 'bg-green-500 text-white' 
                          : 'hover:bg-gray-50'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-3 py-1 border rounded hover:bg-gray-300">
                    다음
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
    </PageTransition>
  );
}

export default FreeBoardList;