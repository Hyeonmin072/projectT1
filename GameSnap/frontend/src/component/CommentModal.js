import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addComment, getComment } from "../axios/VideoAxios";
import { useAuth } from "../context/AuthContext";

const CommentModal = ({ isOpen, onClose, videoId }) => {
    const [newComment, setNewComment] = useState('');
    const { userData, isLoggedIn } = useAuth();  // userData와 isLoggedIn 사용
    const queryClient = useQueryClient();

    console.log('Current userData:', userData); // 디버깅용

    // 댓글 목록 조회 
    const { data: comments = [], isLoading } = useQuery({
        queryKey: ['comments', videoId],
        queryFn: () => getComment(videoId),
        enabled: isOpen && !!videoId,
    });

    // 댓글 작성
    const addCommentMutation = useMutation({
      mutationFn: (newComment) => {
          // 기존 비디오 액시오스 형식에 맞춤
          const commentData = {
              memberId: userData?.id,  // userId 대신 memberId 사용
              videoId: videoId,
              content: newComment
          };
          
          console.log('Sending comment data:', commentData);
          return addComment(commentData);
      },
      onSuccess: (response) => {
          console.log('Comment added successfully:', response);
          queryClient.invalidateQueries(['comments', videoId]);
          setNewComment('');
      },
      onError: (error) => {
          console.error("댓글 추가 실패:", error);
          if (error.response) {
              console.error("Error response:", error.response.data);
          }
          alert("댓글 작성에 실패했습니다.");
      }
  });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isLoggedIn || !userData?.id) {
            alert('로그인이 필요합니다.');
            return;
        }

        const trimmedComment = newComment.trim();
        if (!trimmedComment) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }

        try {
            await addCommentMutation.mutateAsync(trimmedComment);
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    return (
        <div className={`
            fixed inset-0 bg-black/50 flex items-center justify-center z-50
            transition-all duration-300 ease-in-out pt-[150px]
            ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}>
            <div className={`
                bg-white rounded-lg w-[500px] h-[80vh] flex flex-col relative -mt-20
                transition-all duration-300 ease-in-out transform
                ${isOpen 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 translate-y-10'
                }
            `}>
                {/* 헤더 */}
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        댓글 {comments?.length || 0}개
                        {isLoading && <span className="ml-2 text-sm text-gray-500">로딩중...</span>}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* 댓글 목록 */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {isLoading ? (
                        <p className="text-gray-500">댓글을 불러오는 중...</p>
                    ) : comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold">{comment.name}</span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(comment.createDate).toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-gray-700">{comment.content}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">댓글이 없습니다.</p>
                    )}
                </div>

                {/* 댓글 입력 폼 */}
                <form onSubmit={handleSubmit} className="border-t p-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={isLoggedIn ? "댓글을 입력하세요..." : "로그인 후 댓글을 작성할 수 있습니다."}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            disabled={!isLoggedIn || addCommentMutation.isPending}
                        />
                        <button
                            type="submit"
                            disabled={!isLoggedIn || !newComment.trim() || addCommentMutation.isPending}
                            className={`px-4 py-2 rounded-lg transition-colors
                                ${(!isLoggedIn || !newComment.trim() || addCommentMutation.isPending)
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-green-500 hover:bg-green-900 text-white'
                                }`}
                        >
                            {addCommentMutation.isPending ? '작성중...' : '작성'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommentModal;