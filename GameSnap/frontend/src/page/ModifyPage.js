/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import FreeBoardAxios from "../axios/FreeBoardAxios";

const BASE_URL = 'http://localhost:1111';

const ModifyPage = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  // 기존 게시글 데이터 불러오기
  useEffect(() => {
    console.log('수정할 게시글 ID:', boardId);
    
    axios.get(`${BASE_URL}/board/${boardId}`)
      .then(response => {
        console.log('서버 응답:', response.data);
        if (response.data) {
          setFormData({
            title: response.data.title,
            content: response.data.content
          });
        } else {
          console.error('게시글을 찾을 수 없습니다.');
          alert('게시글을 찾을 수 없습니다.');
          navigate('/board');
        }
      })
      .catch(error => {
        console.error("게시글 로딩 실패:", error.response);
        alert('게시글을 불러오는데 실패했습니다.');
        navigate('/board');
      });
  }, [boardId]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 수정 취소
  const handleCancel = () => {
    if(window.confirm('수정을 취소하시겠습니까?')) {
      navigate(`/board/${boardId}`);
    }
  };

  // 수정 제출 (FreeBoardAxios 사용)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!boardId) {
      console.error('게시글 ID가 없습니다');
      return;
    }
  
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
  
    try {
      console.log('수정할 게시글 ID:', boardId);
      console.log('수정할 데이터:', formData);
      const response = await FreeBoardAxios.updateboard(boardId, formData);
      console.log('수정 응답:', response);
      
      alert('게시글이 수정되었습니다.');
      navigate(`/board/${boardId}`);
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 뒤로가기 버튼 */}
        <div className="flex items-center mb-6">
          <button 
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="text-sm">돌아가기</span>
          </button>
        </div>

        {/* 수정 폼 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">게시글 수정</h1>
          
          <form onSubmit={handleSubmit}>
            {/* 제목 입력 */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                제목
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="제목을 입력하세요"
              />
            </div>

            {/* 내용 입력 */}
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                내용
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="내용을 입력하세요"
              />
            </div>

            {/* 버튼 그룹 */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                수정완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifyPage;