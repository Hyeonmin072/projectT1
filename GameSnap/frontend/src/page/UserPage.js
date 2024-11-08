import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import PageTransition from '../component/PageTransition';
import { useAuth } from '../context/AuthContext';


const UserPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);  // 좋아요 상태
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [video, setVideo] = useState(null); // 비디오 정보를 저장할 상태 추가
  const { userData } = useAuth();

  // 비디오와 좋아요 데이터를 가져오는 useEffect
  useEffect(() => {
    axios.get('http://localhost:1111/video/random')  // 백엔드 API 엔드포인트
      .then((response) => {
        const fetchedVideo = response.data[0]; // 첫 번째 비디오를 선택하거나 여러 개를 처리
        setVideo(fetchedVideo);
        setLikes(fetchedVideo.like); // 비디오에서 가져온 좋아요 수 설정
        console.log("Fetched Video Data: ", fetchedVideo); // 데이터 확인
      })
      .catch((error) => {
        console.error("There was an error fetching the video!", error);
      });
  }, []);

  // 댓글을 불러오는 useEffect
  useEffect(() => {
    if (showComments && video) {
      axios.get(`http://localhost:1111/video/${video.id}/comments`) // 댓글을 불러오는 API 호출
        .then((response) => {
          setComments(response.data); // 댓글 데이터 설정
          console.log("Fetched Comments: ", response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the comments!", error);
        });
    }
  }, [showComments, video]);

  const handleLike = () => {
    const newLikes = isLiked ? likes - 1 : likes + 1;
    setIsLiked(!isLiked);
    setLikes(newLikes);  // 좋아요 클릭 시 좋아요 수 업데이트
    console.log('좋아요 클릭');
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    
    // 데이터가 제대로 준비됐는지 로그 확인
    console.log("댓글 내용:", newComment);
    console.log("비디오 ID:", video ? video.id : "비디오 없음");
    console.log("사용자 ID:", userData ? userData.id : "사용자 없음");
  
    // 데이터 전송 전에 모든 값이 유효한지 체크
    if (newComment.trim() && video && userData) {
      const commentData = {
        content: newComment,
        videoId: video.id,
        memberId: userData.id
      };
      
      // 요청할 데이터 로그 확인
      console.log("전송할 데이터:", commentData);
  
      axios.post(`http://localhost:1111/video/addComments`, commentData)
        .then((response) => {
          console.log("댓글 저장 성공:", response.data);
          setComments([...comments, response.data]);
          setNewComment('');
        })
        .catch((error) => {
          console.error("There was an error posting the comment!", error);
        });
    } else {
      console.log("필수 데이터가 누락되었습니다. 댓글 내용, 비디오, 사용자 정보 확인");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-[3000px] mx-auto pt-4 px-6">
          {/* 메인 콘텐츠 컨테이너 */}
          <div className="flex gap-6 items-start justify-center">
            {/* 동영상과 버튼을 감싸는 컨테이너 */}
            <div className={`flex gap-4 ${showComments ? 'w-5/6' : 'w-full'} transition-all duration-300`}>
              {/* 동영상 플레이어 컨테이너 */}
              <div className="relative flex-1 bg-black aspect-video rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    {video && (
                      <video
                        className="w-full h-full object-contain"
                        controls
                        autoPlay
                        muted
                        loop
                      >
                        <source src={video.streamUrl} type="video/mp4" />
                        동영상을 재생할 수 없습니다.
                      </video>
                    )}
                  </div>
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
                    onClick={() => {
                      console.log('댓글 버튼 클릭');
                      setShowComments(!showComments);
                    }}
                    className={`flex flex-col items-center ${showComments ? 'text-green-500' : 'text-gray-600'} hover:opacity-75 transition-colors`}
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
              <div className="border-t p-4">
                <form onSubmit={handleAddComment}>
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
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserPage;
