import React, { useState, useEffect } from 'react';
import { register } from './axios/RegisterAxios';

const RegisterForm = ({ onClose, onRegisterSuccess, onLoginClick }) => { 
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    tel: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginClick = () => {
    setIsVisible(false);
    setIsVisible(false);
    setTimeout(() => {
      if (onLoginClick) onLoginClick(); 
    }, 500);
  };

  const validateForm = () => {
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return false;
    }

    if (!formData.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      setError('비밀번호는 8자 이상의 문자와 숫자 조합이어야 합니다.');
      return false;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return false;
    }

    if (formData.name.length < 2) {
      setError('이름은 2자 이상이어야 합니다.');
      return false;
    }

    if (!formData.phone.match(/^\d{3}-\d{3,4}-\d{4}$/)) {
      setError('올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await register(formData);
      console.log('Register successful:', response.data);
      onRegisterSuccess?.();
      onClose();
    } catch (error) {
      if (error.response) {
        console.error('Register error response:', error.response.data);
        setError(error.response.data.message || '회원가입에 실패했습니다.');
      } else if (error.request) {
        console.error('Register error request:', error.request);
        setError('서버와의 통신에 실패했습니다.');
      } else {
        console.error('Register error message:', error.message);
        setError('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className={`
      fixed inset-0 flex items-center justify-center p-4 z-100 
      transition-opacity duration-500 
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

    <div 
      className={`fixed inset-0 bg-black transition-opacity duration-500 
        ${isVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`}
      onClick={handleClose}
    />

    <div className={`
        bg-white rounded-lg w-full max-w-md relative
        transform transition-all duration-300 z-60
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 
                   transition-colors duration-200"
        >
          ✕
        </button>
        
        <div className="p-6">
          <h2 className="text-xl font-bold text-center mb-6">회원가입</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
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
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호 (8자 이상, 문자/숫자 조합)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="비밀번호 확인"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex gap-2">  {/* flex와 간격 추가 */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="닉네임"
                className="w-[70%] px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                name="name_check"
                value={formData.name_check}
                onChange={handleChange}
                className="w-[30%] bg-white-600 text-black py-2 px-4 rounded-lg hover:bg-gray-300 border border-gray-500
                transition-colors duration-300"
                required
              >
                중복 확인  
              </button>
              
            </div>

            <div>
              <input
                type="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="전화번호 (EX: 010-1234-5678)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-900
                transition-colors duration-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              가입하기
            </button>

            <div className="text-center text-sm text-gray-600">
              이미 계정이 있으신가요?{' '}
              <button 
                type="button"
                onClick={handleLoginClick}
                className="text-green-500 hover:text-green-900 font-bold"
              >
                로그인하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

RegisterForm.defaultProps = {
  onClose: () => {},
  onRegisterSuccess: () => {},
  onLoginClick: () => {}
};

export default RegisterForm;