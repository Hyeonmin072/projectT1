// FileUploadModal.js
import React, { useRef, useState, useEffect } from 'react';
import { MonitorUp, X } from 'lucide-react';
import * as VideoAxios from '../axios/VideoAxios';  // apiClient import

const FileUploadModal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [uploadError, setUploadError] = useState(null);  // 업로드 오류 상태 추가

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setTimeout(() => {
        const element = document.getElementById('modal-content');
        if (element) {
          element.style.transform = 'translateY(0) scale(1)';
          element.style.opacity = '1';
        }
      }, 50);
    }
  }, [isOpen]);

  const handleClose = () => {
    const element = document.getElementById('modal-content');
    if (element) {
      element.style.transform = 'translateY(100px) scale(0.9)';
      element.style.opacity = '0';
    }
    setTimeout(() => {
      setMounted(false);
      onClose();
    }, 300);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const fileUrl = await VideoAxios.uploadFile(file);  // 파일 업로드
        console.log("파일 업로드 성공:", fileUrl);
      } catch (error) {
        setUploadError('파일 업로드 중 오류 발생. 다시 시도해 주세요.');
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect({ target: { files: [file] } });  // 드래그 앤 드롭 파일 업로드 처리
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  if (!mounted && !isOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300
          ${isOpen ? 'opacity-50' : 'opacity-0'}`}
        onClick={handleClose}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          id="modal-content"
          className="bg-white rounded-lg shadow-xl w-full max-w-3xl min-h-[400px] flex flex-col"
          style={{
            transform: 'translateY(100px) scale(0.9)',
            opacity: '0',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-2xl font-semibold text-gray-800">파일 업로드</h3>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 p-6">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`
                w-full h-full border-2 border-dashed rounded-lg
                flex flex-col items-center justify-center
                transition-all duration-300 p-6 
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
              `}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="video/*"  // 비디오 파일만 선택할 수 있도록 설정
              />
              
              <MonitorUp
                size={48}
                className={`mb-4 transform transition-transform duration-300
                  ${isDragging ? 'text-blue-500 scale-110' : 'text-gray-400'}`}
              />
              
              <p className="text-xl text-gray-600 mb-2">
                {isDragging ? '파일을 여기에 놓으세요!' : '파일을 이 영역에 드래그하세요'}
              </p>
              <p className="text-sm text-gray-500 mb-4">또는</p>
              
              <button
                onClick={() => fileInputRef.current.click()}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                  transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                파일 선택하기
              </button>
            </div>

            {uploadError && (
              <p className="text-red-500 text-sm mt-2">{uploadError}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUploadModal;
