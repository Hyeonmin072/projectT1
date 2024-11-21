import React, { useState, useEffect } from 'react';
import PageTransition from '../component/PageTransition';
import { useAuth } from '../context/AuthContext';
import VideoPlayer from '../component/VideoPlayer';
import CommentModal from '../component/CommentModal';
import * as VideoAxios from '../axios/VideoAxios';

const UserPage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { userData } = useAuth();


  useEffect(() => {
    // 컴포넌트 마운트시 스크롤 방지
    document.body.style.overflow = 'hidden';
    
    // 컴포넌트 언마운트시 스크롤 복구
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  // 비디오 목록 가져오기
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (userData?.likeGamesId?.length > 0) {
          console.log("비디오 가져오는중");
          const fetchedVideos = await VideoAxios.getPreferenceRandomVideo(userData.likeGamesId, userData.id); // 선호게임 랜덤 비디오 요청
          console.log("PreferenceRandomVideo:Data",fetchedVideos);
          if (fetchedVideos.length === 0) {
            const randomVideos = await VideoAxios.getRandomVideo(userData.id);  // 선호게임이 없을 시 그냥 무작위 비디오 요청
            console.log("RandomVideo:Data",randomVideos);
            setVideos(randomVideos);
          } else {
            setVideos(fetchedVideos);
          }
        } else {
          const randomVideos = await VideoAxios.getRandomVideo(userData.id);
          setVideos(randomVideos);
        }
      } catch (error) {
        console.error("비디오를 불러오는데 오류가 발생했습니다.", error);
      }
    };

    if (userData?.id) {
      fetchVideos();
    }
  }, [userData]);

  // 현재 비디오 데이터 업데이트
  useEffect(() => {
    const updateVideoData = async () => {
      if (videos.length > 0 && videos[currentIndex]) {
        const currentVideo = videos[currentIndex];   // 현재 실행되는 비디오 정보 가져오기
        setLikes(currentVideo.like);   //현재 실행되는 비디오 좋아요 수
        setIsLiked(currentVideo.liked); //현재 실행되는 비디오에 로그인한 유저가 좋아요를 눌렀는 영상인지 상태 체크 TrueFalse

        try {
          const fetchedComments = await VideoAxios.getComment(currentVideo.id);  //현재 비디오의 댓글목록 가져오기
          setComments(fetchedComments);
        } catch (error) {
          console.error("댓글을 불러오는데 오류가 발생했습니다.");
        }
      }
    };

    updateVideoData();
  }, [videos, currentIndex]);

  // 좋아요 처리
  const handleLike = async () => {
    try {
      if (!videos[currentIndex]?.id || !userData?.id) {
        console.error('비디오 ID 또는 사용자 ID가 없습니다');
        return;
      }

      const response = await VideoAxios.ToggleLike(videos[currentIndex].id, userData.id);  // 좋아요 토글 요청
      if (response) {
        setIsLiked(!isLiked);
        setLikes(prev => (isLiked ? prev - 1 : prev + 1));
      }
    } catch (error) {
      console.error('좋아요 상태 업데이트 실패:', error);
    }
  };
  // 랜덤 비디오 추가 요청 함수
const fetchMoreRandomVideos = async () => {
  try {
    const additionalVideos = await VideoAxios.getRandomVideo(userData.id); // 랜덤 비디오 요청
    console.log("additionalVideos:Data호출",additionalVideos)
    if (additionalVideos.length > 0) {
      setVideos((prevVideos) => [...prevVideos, ...additionalVideos]); // 기존 리스트에 병합
    } else {
      console.log("더 이상 랜덤 비디오가 없습니다.");
    }
  } catch (error) {
    console.error("추가 랜덤 비디오를 불러오는데 실패했습니다.", error);
  }
};

  // 댓글 추가 처리
  const handleAddComment = async (newComment) => {
    if (newComment.trim() && userData) {
      const commentData = {
        content: newComment,
        videoId: videos[currentIndex].id,
        memberId: userData.id,
      };

      try {
        const addedComment = await VideoAxios.addComment(commentData);   // 댓글 추가 요청
        setComments((prevComments) => [...prevComments, addedComment]); // 기존 댓글에 추가응답받은 댓글 병합
      } catch (error) {
        console.error("댓글 추가에 실패했습니다.", error);
      }
    }
  };

  // 비디오 전환
  const prevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);   //현재 인덱스에서 이전 인덱스 비디오 호출
      console.log("이전 비디오 호출");
    }
  };

  const nextVideo = () => {
    if (currentIndex < videos.length - 1) {   // 현재 인덱스에서 다음 인덱스 비디오 호출
      setCurrentIndex(currentIndex + 1);
      console.log("다음 비디오 호출")
    } else {
      console.log("모든 비디오를 소진하였습니다."); 
      fetchMoreRandomVideos()  // 모든 비디오를 소진했을시 무작위 랜덤 비디오 요청하는 함수
    }
  };

  // 방향키 입력 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevVideo(); // 왼쪽 방향키: 이전 비디오
      } else if (event.key === 'ArrowRight') {
        nextVideo(); // 오른쪽 방향키: 다음 비디오
      }
    };

    window.addEventListener('keydown', handleKeyDown);   //눌렀을때 이벤트 감지 
    return () => {
      window.removeEventListener('keydown', handleKeyDown);  // 뗏을때 이벤트 감지  * 누수를 방지함 *
    };
  }, [currentIndex, videos]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
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

        <CommentModal
          isOpen={showCommentModal}
          onClose={() => setShowCommentModal(false)}
          comments={comments}
          onAddComment={handleAddComment}
          videoId={videos[currentIndex]?.id}
        />
      </div>
    </PageTransition>
  );
};

export default UserPage;
