import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTransition from '../component/PageTransition';
import { useAuth } from '../context/AuthContext';
import VideoPlayer from '../component/VideoPlayer';
import CommentModal from '../component/CommentModal';

/* eslint-disable */


const UserPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [video, setVideo] = useState(null);
  const { userData } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <VideoPlayer
          video={video}
          onLike={handleLike}
          isLiked={isLiked}
          likes={likes}
          onCommentClick={() => setShowCommentModal(true)}
          commentCount={comments.length}
          onShare={() => console.log('공유하기')}
        />

        <CommentModal
          isOpen={showCommentModal}
          onClose={() => setShowCommentModal(false)}
          comments={comments}
          onAddComment={handleAddComment}
          videoId={video?.id}
        />
      </div>
    </PageTransition>
  );
};

export default UserPage;