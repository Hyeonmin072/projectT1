import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../component/PageTransition';
import { useAuth } from '../context/AuthContext';
import VideoPlayer from '../component/VideoPlayer';
import CommentModal from '../component/CommentModal';
import * as VideoAxios from '../axios/VideoAxios';

const UserPage = () => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { userData } = useAuth();

  useEffect(() => {
    // 스크롤 방지
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (!userData?.id) {
          navigate('/login');
          return;
        }

        if (userData.likeGamesId?.length > 0) {
          // 선호 게임 기반 비디오 요청
          const fetchedVideos = await VideoAxios.getPreferenceRandomVideo(
            userData.likeGamesId, 
            userData.id
          );
          
          if (fetchedVideos.length === 0) {
            // 선호 게임 비디오가 없으면 랜덤 비디오 요청
            const randomVideos = await VideoAxios.getRandomVideo(userData.id);
            setVideos(randomVideos);
          } else {
            setVideos(fetchedVideos);
          }
        } else {
          // 선호 게임이 없으면 랜덤 비디오 요청
          const randomVideos = await VideoAxios.getRandomVideo(userData.id);
          setVideos(randomVideos);
        }
      } catch (error) {
        console.error("비디오를 불러오는데 오류가 발생했습니다.", error);
      }
    };

    fetchVideos();
  }, [userData, navigate]);

  // 현재 비디오 데이터 업데이트
  useEffect(() => {
    const updateCurrentVideo = async () => {
      if (videos.length > 0 && videos[currentIndex]) {
        const currentVideo = videos[currentIndex];
        setLikes(currentVideo.like);
        setIsLiked(currentVideo.liked);

        try {
          const fetchedComments = await VideoAxios.getComment(currentVideo.id);
          setComments(fetchedComments);
        } catch (error) {
          console.error("댓글을 불러오는데 오류가 발생했습니다.");
        }
      }
    };

    updateCurrentVideo();
  }, [videos, currentIndex]);

  const handleLike = async () => {
    if (!userData) {
      navigate('/login');
      return;
    }

    try {
      if (!videos[currentIndex]?.id) return;

      const response = await VideoAxios.ToggleLike(
        videos[currentIndex].id,
        userData.id
      );
      
      if (response) {
        setIsLiked(!isLiked);
        setLikes(prev => isLiked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error('좋아요 상태 업데이트 실패:', error);
    }
  };

  const handleAddComment = async (newComment) => {
    if (!userData) {
      navigate('/login');
      return;
    }

    if (newComment.trim()) {
      try {
        const commentData = {
          content: newComment,
          videoId: videos[currentIndex].id,
          memberId: userData.id,
        };

        const addedComment = await VideoAxios.addComment(commentData);
        setComments(prevComments => [...prevComments, addedComment]);
      } catch (error) {
        console.error("댓글 추가에 실패했습니다.", error);
      }
    }
  };

  const fetchMoreRandomVideos = async () => {
    try {
      const additionalVideos = await VideoAxios.getRandomVideo(userData.id);
      if (additionalVideos.length > 0) {
        setVideos(prevVideos => [...prevVideos, ...additionalVideos]);
      }
    } catch (error) {
      console.error("추가 랜덤 비디오를 불러오는데 실패했습니다.", error);
    }
  };

  const prevVideo = () => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setKey(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const nextVideo = () => {
    if (currentIndex < videos.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setKey(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    } else if (!isTransitioning) {
      fetchMoreRandomVideos();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevVideo();
      } else if (event.key === 'ArrowRight') {
        nextVideo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, videos, isTransitioning]);

  return (
    <div className="fixed inset-0 bg-gray-50 pt-[160px]">
      <AnimatePresence mode="wait">
        <div className="w-full h-full flex items-center justify-center">
          <PageTransition key={key}>
            {videos.length > 0 && (
              <VideoPlayer
                video={videos[currentIndex]}
                onLike={handleLike}
                isLiked={isLiked}
                likes={likes}
                onCommentClick={() => setShowCommentModal(true)}
                commentCount={comments.length}
                onShare={() => console.log('공유하기')}
              />
            )}
          </PageTransition>

          <CommentModal
            isOpen={showCommentModal}
            onClose={() => setShowCommentModal(false)}
            comments={comments}
            onAddComment={handleAddComment}
            videoId={videos[currentIndex]?.id}
          />
        </div>
      </AnimatePresence>
    </div>
  );
};

export default UserPage;