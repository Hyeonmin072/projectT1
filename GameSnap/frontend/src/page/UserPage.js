import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageTransition from '../component/PageTransition';
import { useAuth } from '../context/AuthContext';
import VideoPlayer from '../component/VideoPlayer';
import CommentModal from '../component/CommentModal';
import * as VideoAxios from '../axios/VideoAxios';

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
    const fetchVideo = async () => {
      try {
        const fetchedVideo = await VideoAxios.getPreferenceRandomVideo(userData.likeGamesId,userData.id); //비디오 요청
        if(fetchVideo.length === 0){
          console.log("선호 게임에 맞는 비디오가 없어 랜덤 비디오 요청");
          const randomVideos = await VideoAxios.getRandomVideo();
          if (randomVideos.length > 0) {
            setVideo(randomVideos[0]); // 랜덤 비디오 중 첫 번째 비디오 설정
            setLikes(randomVideos[0].like); // 좋아요 수 설정
            setIsLiked(randomVideos[0].isLiked);
          } else {
            console.log("랜덤 비디오도 없습니다.");
          }
        } else {
          setVideo(fetchedVideo[0]);                        // 임시로 0번째 비디오 호출
          setLikes(fetchedVideo[0].like);                  // 0 번째 비디오 좋아요 수 
          setIsLiked(fetchedVideo[0].isLiked);
        }
      } catch (error) {
        console.error("비디오를 불러오는데 오류가 발생했습니다.");
      }
    };
    fetchVideo();
  }, []);


  // 댓글을 불러오는 useEffect
  useEffect(() => {
    const fetchComments = async () => {
      if (showCommentModal && video) {
        try {
          const fetchedComments = await VideoAxios.getComment(video.id);  //댓글 불러오기
          setComments(fetchedComments);     
        } catch (error) {
          console.error("댓글을 불러오는데 오류가 발생했습니다.");
        }
      }
    };
    fetchComments();
  }, [showCommentModal, video]);

  const handleLike = async () => {
    try {
        if (!video?.id || !userData?.id) {
            console.error('비디오 ID 또는 사용자 ID가 없습니다');
            return;
        }

        console.log('좋아요 요청 데이터:', {
            videoId: video.id,
            memberId: userData.id
        });

        const response = await VideoAxios.ToggleLike(video.id, userData.id);
        
        // response 구조 확인
        console.log('좋아요 응답 데이터:', response);
        
        if (response) {
            setIsLiked(prev => !prev); // 직접 토글
            setLikes(prev => isLiked ? prev - 1 : prev + 1);
        }

    } catch (error) {
        console.error('좋아요 상태 업데이트 실패:', error);
    }
};


  const handleAddComment = async (newComment, videoId) => {
    if (newComment.trim() && video && userData) {
        const commentData = {
            content: newComment,
            videoId: video.id,
            memberId: userData.id,
        };
    
        try {
            const addedComment = await VideoAxios.addComment(commentData);
            setComments((prevComments) => [...prevComments, addedComment]);
            setNewComment('');
        } catch (error) {
            console.error("댓글 추가에 실패했습니다.", error);
        }
    } else {
        console.log("모든 필수 정보를 입력해주세요.");
        // 유효하지 않은 경우 추가 로그
        if (!newComment.trim()) {
            console.log("댓글 내용이 비어있습니다.");
        }
        if (!video) {
            console.log("비디오 정보가 없습니다.");
        }
        if (!userData) {
            console.log("사용자 정보가 없습니다.");
        }
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