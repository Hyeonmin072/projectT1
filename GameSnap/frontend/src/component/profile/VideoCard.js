// components/profile/VideoCard.jsx
import React from 'react';
import { Video, Play, Calendar, Eye } from 'lucide-react';

const VideoCard = ({ video }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-all duration-200">
    <div className="relative aspect-video bg-gray-100">
      {video.thumbnail ? (
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Video className="w-12 h-12 text-gray-400" />
        </div>
      )}
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
        {video.duration}
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-30 transition-all duration-200">
        <Play className="w-12 h-12 text-white" />
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-medium text-gray-900 truncate">{video.title}</h3>
      <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
        <div className="flex items-center">
          <Eye className="w-4 h-4 mr-1" />
          <span>{video.views.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{new Date(video.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  </div>
);

export default VideoCard;