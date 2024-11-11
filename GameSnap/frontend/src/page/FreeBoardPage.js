import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, ThumbsUp, Trash2, PencilLine } from 'lucide-react';
import FreeBoardAxios from "../axios/FreeBoardAxios";

function FreeBoardPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 게시글 상세정보 가져오기
    const fetchPost = async () => {
      try {
        const response = await FreeBoardAxios.getPostDetail(postId);
        if (response) {
          setPost(response);
        } else {
          console.error('게시글을 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error("게시글 로딩 실패:", error);
      }
    };

    // 조회수 증가 호출
    const incrementPostViews = async () => {
      try {
        await FreeBoardAxios.incrementViews(postId);
      } catch (error) {
        console.error('조회수 증가 실패:', error);
      }
    };

    // 댓글 목록 가져오기
    const fetchComments = async () => {
      try {
        const response = await FreeBoardAxios.getComments(postId);
        setComments(response);
      } catch (error) {
        console.error('댓글 목록 로딩 실패:', error);
      }
    };

    fetchPost();
    incrementPostViews();
    fetchComments();
  }, [postId]);

  // 게시글 삭제 함수
  const handleDelete = async () => {
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await FreeBoardAxios.deletePost(postId);
      alert('게시글이 삭제되었습니다.');
      navigate('/board');
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  // 게시글 수정 페이지로 이동
  const handleModify = () => {
    // 작성자 확인
    if (userData?.id !== post?.memberId) {
      alert('게시글 수정 권한이 없습니다.');
      return;
    }
    navigate(`/board/modify/${postId}`);
  };

  // 댓글 삭제 함수
const handleDeleteComment = async (commentId) => {
  if (!window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
    return;
  }

  try {
    await FreeBoardAxios.deleteComment(postId, commentId);
    // 삭제 후 댓글 목록에서 해당 댓글 제거
    setComments(comments.filter(comment => comment.id !== commentId));
    alert('댓글이 삭제되었습니다.');
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
    alert('댓글 삭제에 실패했습니다.');
  }
};

  // 게시글 좋아요 함수
  const handleLike = async () => {
    try {
      const response = await FreeBoardAxios.likePost(postId, userData?.name);
      setPost(response);
    } catch (error) {
      console.error('게시글 좋아요 실패:', error);
      alert('게시글 좋아요에 실패했습니다.');
    }
  };

  // 댓글 작성 함수 추가
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      // 댓글 작성 API 호출 (아직 구현되지 않은 것 같습니다)
      const response = await FreeBoardAxios.createComment(postId, {
        comment: newComment,
        memberId: userData?.id,
        memberName: userData?.name
      });
      setComments([...comments, response]);
      setNewComment('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  if (!post) {
    return <div className="min-h-screen bg-gray-50 py-8 flex justify-center items-center">
      <p>게시글을 불러오는 중...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 목록으로 돌아가기 버튼 */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/board')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="text-sm">목록으로</span>
          </button>
        </div>

        {/* 게시글 내용 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              {/* 제목 */}
              <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
              
              {/* 작성자 정보와 작성일 */}
              <div className="flex items-center gap-4 text-sm text-gray-600 border-b border-gray-200 pb-4 mb-4">
                <span>작성자: {post.memberName}</span>
                <span className="text-gray-300">|</span>
                <span>작성일: {post.createDate}</span>
              </div>

              {/* 본문 내용 */}
              <div className="prose max-w-none border border-gray-200 rounded-lg p-6 bg-gray-50">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>
            </div>

          {/* 좋아요, 수정, 삭제 버튼 */}
          <div className="flex px-6 pb-4">
            <div className="flex items-center">
              <button 
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-pink-600 flex items-center gap-2" 
                onClick={handleLike}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>좋아요 {post.like}</span>
              </button>
            </div>
            {userData?.id === post.memberId && (
              <div className="flex gap-2 ml-auto">
                <button
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                  onClick={handleModify}
                >
                  <PencilLine className="w-4 h-4" />
                  <span>수정</span>
                </button>
                <button
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
                  onClick={handleDelete}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>삭제</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className="mt-8 bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">댓글</h2>

            {/* 댓글 입력 */}
            <form onSubmit={handleCommentSubmit} className="mb-6">
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
                      <span className="font-semibold">{comment.memberName}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createDate).toLocaleString()}
                      </span>
                    </div>
                    {userData?.id === comment.memberId && (
                      <button
                        className="text-sm text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        삭제
                      </button>
                    )}
                  </div>
                  <p className="text-gray-700">{comment.comment}</p>
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