// components/profile/ProfileVideos.jsx
import React from 'react';
import { Video, Trash2} from 'lucide-react';
import VideoCard from './VideoCard';
import { profileAPI } from '../../axios/UserProfileAxios';
import { useMutation } from '@tanstack/react-query';

const ProfileVideos = ({ videos, refetchVideos }) => {

  const { mutate:deleteVideo} = useMutation ({
    mutationFn:(videoId) => profileAPI.deleteVideo(videoId),
    onSuccess: (data) => {
      console.log(data);
      refetchVideos();
    },
    onError: (error) =>{

      console.log("삭제실패 : ",error);
    }
  });

  

  const handleDelete = (videoId) =>{
    if(window.confirm("정말로 비디오를 삭제하시겠습니까?")){
      deleteVideo(videoId);
    }
  }


  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="relative">
              <VideoCard video={video} />
              <button
                onClick={() => handleDelete(video.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>  
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