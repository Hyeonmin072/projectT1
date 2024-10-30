import React, { useState } from 'react';

// LoginForm component included in the same file to avoid import issues
const LoginForm = ({ onClose }) => {
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
    console.log('Login attempt:', formData);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
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
              로그인
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

// Navbar component
const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <nav className="bg-black shadow-lg p-4 flex justify-between">
        <div className="text-2xl py-2 font-bold text-white">GameSnap</div>
        <ul className="flex space-x-4">
          <div className="flex justify-end">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-6 py-3 bg-white text-black-600 font-semibold rounded-md hover:bg-green-700 hover:text-white"
            >
              회원 로그인
            </button>
          </div>
        </ul>
      </nav>

      {isLoginOpen && <LoginForm onClose={() => setIsLoginOpen(false)} />}
    </>
  );
};

export default Navbar;