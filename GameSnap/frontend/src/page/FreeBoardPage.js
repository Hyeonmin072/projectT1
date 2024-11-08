import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // URL 파라미터 사용
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

function FreeBoardPage() {
  const { postId } = useParams(); // URL에서 게시글 ID 가져오기
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { userData } = useAuth();

  // 게시글 데이터 가져오기
  useEffect(() => {
    axios.get(`http://localhost:1111/board/${postId}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error("게시글 로딩 실패:", error);
      });
  }, [postId]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 목록으로 돌아가기 버튼 */}
        <div className="flex items-center mb-6">
            <button 
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-6 h-6" />
                <span className="text-sm">목록으로</span>
            </button>
        </div>
        {/* 게시글 헤더 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">{post?.title}</h1>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">작성자: {post?.author}</span>
                <span className="text-gray-600">
                  작성일: {new Date(post?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* 게시글 내용 */}
            <div className="prose max-w-none">
              <p className="text-gray-800 leading-relaxed">
                {post?.content}
              </p>
            </div>
          </div>

          {/* 작성자 관련 버튼 (수정/삭제) */}
          {userData?.id === post?.memberId && (
            <div className="flex justify-end gap-2 px-6 pb-4">
              <button className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                수정
              </button>
              <button className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                삭제
              </button>
            </div>
          )}
        </div>

        {/* 댓글 섹션 */}
        <div className="mt-8 bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">댓글</h2>
            
            {/* 댓글 입력 */}
            <form className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  작성
                </button>
              </div>
            </form>

            {/* 댓글 목록 */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-100 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{comment.author}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {userData?.id === comment.memberId && (
                      <button className="text-sm text-red-500 hover:text-red-600">
                        삭제
                      </button>
                    )}
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FreeBoardPage;