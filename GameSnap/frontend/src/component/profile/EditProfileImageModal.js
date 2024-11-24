// components/profile/EditProfileImageModal.jsx
import React, { useState, useRef } from 'react';
import { X, Upload, Camera, Trash } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { profileAPI } from '../../axios/UserProfileAxios';

const EditProfileImageModal = ({ isOpen, onClose, currentImage }) => {
  const [preview, setPreview] = useState(currentImage);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const { userData, updateUserData } = useAuth();
  
  

  const uploadImageMutation = useMutation({
    mutationFn: async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('userId', userData.id);

        // FormData 내용 확인
        for (let pair of formData.entries()) {
            console.log('FormData entry:', pair[0], pair[1]);
        }

        // 파일 정보도 확인
        console.log('File info:', {
            name: file.name,
            type: file.type,
            size: file.size
        });

        const response = await profileAPI.uploadImage(formData);
        console.log(response.data);
        console.log(response);
        return response.data;
    },
    onSuccess: (data) => {
      updateUserData({
        ...userData,
        image: data // 백엔드에서 반환하는 이미지 URL
      });
      console.log("onSuccess했을때:",userData);
      console.log("onSuccess했을때 data:",data);
    },
    onError: (error) => {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다.');
    }
});

  // 이미지 삭제 mutation
  const deleteImageMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token');
      const response = await profileAPI.deleteImage(userData.name,userData.id,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      setPreview(null);
      setImageFile(null);
    },
    onError: (error) => {
      console.error('이미지 삭제 실패:', error);
      alert('이미지 삭제에 실패했습니다.');
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB 제한
        alert('파일 크기는 5MB를 초과할 수 없습니다.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('이미지 파일만 업로드할 수 있습니다.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageFile) {
      uploadImageMutation.mutate(imageFile);
    }
  };

  const handleDelete = () => {
    if (window.confirm('프로필 이미지를 삭제하시겠습니까?')) {
      deleteImageMutation.mutate();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">프로필 이미지 변경</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이미지 업로드 영역 */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-4
                       flex flex-col items-center justify-center space-y-2
                       hover:border-green-500 transition-colors duration-200"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-48 h-48 relative rounded-full overflow-hidden bg-gray-100">
              {preview ? (
                <img 
                  src={preview} 
                  alt="프로필 미리보기" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            
            <div className="text-center">
              <p className="text-sm text-gray-500">
                클릭하거나 이미지를 드래그하여 업로드
              </p>
              <p className="text-xs text-gray-400">
                5MB 이하의 이미지 파일만 가능
              </p>
            </div>
          </div>

            <div className="flex justify-between items-center mt-6">
            {/* 삭제 버튼 */}
            <button
                type="button"
                onClick={handleDelete}
                disabled={!currentImage && !preview}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200
                ${currentImage || preview
                    ? 'text-red-600 hover:text-red-700 border border-red-600 hover:bg-red-50'
                    : 'text-gray-400 border border-gray-300 cursor-not-allowed'}`}
            >
                <Trash className="w-4 h-4 mr-2" />
                삭제
            </button>

            {/* 저장/취소 버튼 그룹 */}
            <div className="flex items-center gap-3">
                <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg
                            transition-colors duration-200 hover:bg-gray-50"
                >
                취소
                </button>
                <button
                type="submit"
                disabled={!imageFile || uploadImageMutation.isPending}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200
                    ${imageFile && !uploadImageMutation.isPending
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                <Upload className="w-4 h-4 mr-2" />
                {uploadImageMutation.isPending ? '업로드 중...' : '저장'}
                </button>
            </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileImageModal;