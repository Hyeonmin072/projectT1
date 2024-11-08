/*eslint-disable*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageTransition from '../component/PageTransition';
import FreeBoardAxios from '../axios/FreeBoardAxios';

function FreeBoardWrite() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 게시글 저장 로직 추가
    navigate('/board');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              돌아가기
            </button>
            <h1 className="text-2xl font-bold text-gray-800">게시글 작성</h1>
          </div>

          {/* 작성 폼 */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <label 
                htmlFor="title" 
                className="block text-gray-700 font-medium mb-2"
              >
                제목
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="제목을 입력하세요"
                required
              />
            </div>

            <div className="mb-6">
              <label 
                htmlFor="content" 
                className="block text-gray-700 font-medium mb-2"
              >
                내용
              </label>
              <textarea
                id="content"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 min-h-[300px]"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="내용을 입력하세요"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}

export default FreeBoardWrite;