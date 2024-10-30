import React, { useState } from 'react';
/* eslint-disable*/

const LoginForm = ({ onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 실제 로그인 로직을 구현하시면 됩니다
    console.log('Login attempt:', formData);
    
    // 로그인 성공 가정
    onLoginSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        
        <div className="p-6">
          <h2 className="text-xl font-bold text-center mb-6">로그인</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value="test@example.com"
                // {formData.email}
                onChange={handleChange}
                placeholder="이메일"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                value="test"
                // {formData.password}
                onChange={handleChange}
                placeholder="비밀번호"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  자동 로그인
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                비밀번호 찾기
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <a href='#UserPage.js'>로그인</a>
            </button>

            <div className="text-center text-sm text-gray-600">
              계정이 없으신가요?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                회원가입
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;