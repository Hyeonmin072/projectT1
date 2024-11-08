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
        const fetchedVideo = await VideoAxios.getVideo(); //비디오 요청
        setVideo(fetchedVideo[0]);                        // 임시로 0번째 비디오 호출
        setLikes(fetchedVideo[0].like);                  // 0 번째 비디오 좋아요 수 
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

  const handleLike = () => {
    const newLikes = isLiked ? likes - 1 : likes + 1;
    setIsLiked(!isLiked);
    setLikes(newLikes);  // 좋아요 클릭 시 좋아요 수 업데이트
    console.log('좋아요 클릭');
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (newComment.trim() && video && userData) {
      const commentData = {
        content: newComment,           //값이 유효한지 탐색
        videoId: video.id,
        memberId: userData.id,
      };

      try {
        const addedComment = await VideoAxios.addComment(commentData);
        setComments((prevComments) => [...prevComments, addedComment]);
        setNewComment('');
      } catch (error) {
        console.error("댓글 추가에 실패했습니다.");
      }
    } else {
      console.log("모든 필수 정보를 입력해주세요.");
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