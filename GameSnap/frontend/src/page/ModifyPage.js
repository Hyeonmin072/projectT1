import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import FreeBoardAxios from "../axios/FreeBoardAxios";

function ModifyPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { userData } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  // 게시글 데이터 로드
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // postId가 있는지 확인
        if (!postId) {
          alert('잘못된 접근입니다.');
          navigate('/board');
          return;
        }

        const response = await FreeBoardAxios.getPostDetail(postId);
        console.log('불러온 게시글 데이터:', response);
        
        // 작성자 확인
        if (response.memberId !== userData?.id) {
          alert('수정 권한이 없습니다.');
          navigate(`/board/${postId}`);
          return;
        }

        setFormData({
          title: response.title,
          content: response.content,
        });
      } catch (error) {
        console.error('게시글 로딩 실패:', error);
        alert('게시글을 불러오는데 실패했습니다.');
        navigate(`/board/${postId}`);
      }
    };

    fetchPost();
  }, [postId, userData?.id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      const updateData = {
        title: formData.title,
        content: formData.content,
        memberId: userData.id
      };

      console.log('수정할 데이터:', updateData);

      await FreeBoardAxios.updatePost(postId, updateData);
      
      alert('게시글이 수정되었습니다.');
      navigate(`/board/${postId}`);
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 뒤로가기 버튼 */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(`/board/${postId}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>돌아가기</span>
          </button>
        </div>

        {/* 수정 폼 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">게시글 수정</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label 
                htmlFor="title" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                제목
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="mb-6">
              <label 
                htmlFor="content" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                내용
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => navigate(`/board/${postId}`)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                수정하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModifyPage;