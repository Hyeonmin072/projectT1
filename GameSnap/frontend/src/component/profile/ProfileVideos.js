// components/profile/ProfileVideos.jsx
import React from 'react';
import { Video } from 'lucide-react';
import VideoCard from './VideoCard';

const ProfileVideos = ({ videos }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">업로드한 동영상이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default ProfileVideos;