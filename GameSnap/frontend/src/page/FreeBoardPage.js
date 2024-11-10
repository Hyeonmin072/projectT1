/* eslint-disable*/

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // URL 파라미터 사용
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import FreeBoardAxios from "../axios/FreeBoardAxios";

// 기본 URL 설정
const BASE_URL = 'http://localhost:1111'; // 백엔드 서버 URL

function FreeBoardPage() {
  const { postId } = useParams(); // URL에서 게시글 ID 가져오기
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { userData } = useAuth();

  
  useEffect(() => {

    console.log('클릭한 게시글 ID:', postId);
    console.log('현재 유저 데이터:', userData);
    
    //게시글 상세정보 가져오기
    axios.get(`${BASE_URL}/board/${postId}`)
      .then(response => {
        console.log('서버 응답:', response.data);  // 서버에서 받아온 데이터 확인
        if (response.data) {
          setPost(response.data);
        } else {
          console.error('게시글을 찾을 수 없습니다.');
        }
      })
      .catch(error => {
        console.error("게시글 로딩 실패:", error.response);
      });
    
    // 조회수 증가 호출
    FreeBoardAxios.incrementViews(postId)
      .then(response => {
        console.log('조회수 증가 성공 : ', response)
      })
      .catch(error => {
        console.error('조회수 증가 실패 : ', error)
      });
  }, [postId]);

  useEffect(() => {
    console.log('현재 게시글 번호:', postId);
  }, [post]);

  useEffect(() => {
    console.log('현재 댓글 목록:', postId.comments);
  }, [comments]);
  
  useEffect(() => {
    if (post) {
      console.log('현재 게시글 데이터:', {
        id: post.id,
        title: post.title,
        content: post.content,
        createDate: post.createDate,
        memberName: post.memberName
      });
    }
  }, [post]);
  

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {console.log('렌더링 시 post 데이터:', post)}
      {console.log('렌더링 시 comments 데이터:', comments)}


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
              <div className="flex items-center gap-4 border-2 rounded-lg border-green-400">
                <span className="text-gray-600">작성자: {post?.memberName}</span>
                <span className="text-gray-600">
                    작성일: {post?.createDate}
                </span>
              </div>
            </div>

            {/* 게시글 내용 */}
            <div className="prose max-w-none border-2 rounded-lg border-green-400">
              <p className="text-gray-800 leading-relaxed">
                {post?.content}
              </p>
            </div>
          </div>
        
          {/* 좋아요, 수정, 삭제 버튼 */} 
          <div className="flex justify-end gap-2 px-6 pb-4"> 
            <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600" > 
              좋아요 
            </button> 
            <button 
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600" 
            > 
              수정 
            </button> 
            <button 
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600" 
            > 
              삭제 
            </button> 
          </div>
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