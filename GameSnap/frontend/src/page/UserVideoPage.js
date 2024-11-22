import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Video,
  Play,
  Calendar,
  Eye,
  ArrowLeft
} from "lucide-react";

const UserVideosPage = () => {
  const navigate = useNavigate();
  
  // 임시 동영상 데이터 (실제로는 API에서 가져와야 함)
  const userVideos = [
    {
      id: 1,
      title: "게임 플레이 영상",
      thumbnail: "/thumbnail1.jpg",
      views: 1200,
      createdAt: "2024-03-15",
      duration: "12:34"
    },
    // ... 더 많은 비디오 데이터
  ];

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

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            프로필로 돌아가기
          </button>
          <h1 className="text-2xl font-bold">내가 업로드한 동영상</h1>
        </div>
        
        {userVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userVideos.map(video => (
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
    </div>
  );
};

export default UserVideosPage;