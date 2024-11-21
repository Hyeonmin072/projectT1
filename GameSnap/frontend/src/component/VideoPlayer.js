import React from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const VideoPlayer = ({ video, onLike, isLiked, likes, onCommentClick, commentCount, onShare }) => {
    return (
      
      <div className="flex gap-4 w-[1200px] -mt-20">
        {/* 동영상 플레이어 */}
        <div className="relative flex-1 bg-black aspect-video rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full">
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
  
        {/* 버튼 섹션 */}
        <div className="flex flex-col gap-6 justify-end pb-6">
          <button
            onClick={onLike}
            className={`flex flex-col items-center ${
              isLiked ? 'text-red-500' : 'text-gray-600'
            } hover:opacity-75 transition-colors`}
          >
            <Heart 
              className="w-8 h-8"
              fill={isLiked ? "#ef4444" : "none"}
              color={isLiked ? "#ef4444" : "#4b5563"}
            />
            <span className="text-sm">{likes}</span>
          </button>
  
          <button
            onClick={onCommentClick}
            className="flex flex-col items-center text-gray-600 hover:opacity-75 transition-colors"
          >
            <MessageCircle className="w-8 h-8" />
            <span className="text-sm">{commentCount}</span>
          </button>
  
          {/* <button
            onClick={onShare}
            className="flex flex-col items-center text-gray-600 hover:opacity-75 transition-colors"
          >
            <Share2 className="w-8 h-8" />
            <span className="text-sm">공유</span>
          </button> */}
        </div>
      </div>
    );
  console.log("videoStreamUrl:",video.streamUrl);};
  
  export default VideoPlayer;