import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

const UserPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, author: '사용자', time: new Date() }]);
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto pt-4">
        
        {/* 메인 콘텐츠 컨테이너 */}
        <div className="flex gap-6">
          {/* 동영상과 버튼을 감싸는 컨테이너 */}
          <div className={`flex gap-4 ${showComments ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
            {/* 동영상 플레이어 컨테이너 */}
            <div className="relative flex-1 bg-black aspect-video rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white">동영상 플레이어</p>
              </div>
            </div>

            {/* 세로 버튼 섹션 */}
            <div className="flex flex-col gap-6 justify-end pb-6">
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`flex flex-col items-center ${isLiked ? 'text-red-500' : 'text-gray-600'} hover:opacity-75 transition-colors`}
                >
                  <Heart className={`w-8 h-8 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{likes}</span>
                </button>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setShowComments(!showComments)}
                  className={`flex flex-col items-center ${showComments ? 'text-blue-500' : 'text-gray-600'} hover:opacity-75 transition-colors`}
                >
                  <MessageCircle className={`w-8 h-8 ${showComments ? 'fill-current' : ''}`} />
                  <span className="text-sm">{comments.length}</span>
                </button>
              </div>

              <div className="flex flex-col items-center gap-2">
                <button className="flex flex-col items-center text-gray-600 hover:opacity-75 transition-colors">
                  <Share2 className="w-8 h-8" />
                  <span className="text-sm">공유</span>
                </button>
              </div>
            </div>
          </div>

          {/* 댓글 섹션 - 사이드 패널 */}
          <div 
            className={`w-1/3 bg-white rounded-lg shadow-sm h-[calc(100vh-8rem)] overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${
              showComments ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full w-0'
            }`}
          >
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">댓글 {comments.length}개</h2>
            </div>
            
            {/* 댓글 목록 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                      {comment.time.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>

            {/* 댓글 입력 폼 */}
            <div className="border-t p-4">
              <form onSubmit={handleAddComment}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    작성
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;