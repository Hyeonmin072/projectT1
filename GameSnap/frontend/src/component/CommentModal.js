import React from "react";
import { useState } from "react";

const CommentModal = ({ isOpen, onClose, comments, onAddComment, videoId }) => {
    const [newComment, setNewComment] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      onAddComment(newComment, videoId);
      setNewComment('');
    };
  
  
    return (
        <div className={`
            fixed inset-0 bg-black/50 flex items-center justify-center z-50
            transition-all duration-300 ease-in-out
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
            <h2 className="text-lg font-semibold">댓글 {comments.length}개</h2>
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
            {comments.map((comment, index) => (
              <div key={index} className="border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{comment.name}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createDate).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
  
          {/* 댓글 입력 폼 */}
          <form onSubmit={handleSubmit} className="border-t p-4">
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
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-900 transition-colors"
              >
                작성
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default CommentModal;