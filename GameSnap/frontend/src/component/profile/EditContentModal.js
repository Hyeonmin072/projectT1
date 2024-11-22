// components/profile/EditContentModal.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';

const EditContentModal = ({ isOpen, onClose, onSubmit, initialContent }) => {
  const [content, setContent] = useState(initialContent || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(content);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">자기소개 수정</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="자기소개를 입력해주세요"
              className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={500}
            />
            <p className="text-sm text-gray-500 text-right mt-2">
              {content.length}/500
            </p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContentModal;