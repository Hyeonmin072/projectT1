import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import checkNameDuplicate, { verifyCodeCheck,sendEmail,register } from '../axios/RegisterAxios';

const RegisterForm = ({ onClose, onRegisterSuccess, onLoginClick }) => {
  
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    verifyCode: '',
    password: '',
    passwordConfirm: '',
    name: '',
    tel: ''
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [isNameLocked, setIsNameLocked] = useState(false);
  const [isEmailLocked, setIsEmailLocked] = useState(false);
  const [isSendEmailLocked, setIsSendEmailLocked] = useState(false);

  // 전화번호 유효성 검사 상태 추가
  const [phoneValid, setPhoneValid] = useState({
    isValid: false,
    message: '',
    show: false
  });

  // 전화번호 유효성 검사 함수
    const validatePhone = (phone) => {
      if (!phone) {
        return {
          isValid: false,
          message: ''
        };
      }

      // 전화번호 형식 검사
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    const hasOnlyValidChars = /^[\d-]*$/.test(phone); // 숫자와 하이픈만 허용

    if (!hasOnlyValidChars) {
      return {
        isValid: false,
        message: '숫자와 하이픈(-)만 입력해주세요'
      };
    }

    // 전화번호 자동 포맷팅을 위한 숫자만 추출
    const numbers = phone.replace(/[^0-9]/g, '');

    if (numbers.length > 11) {
      return {
        isValid: false,
        message: '올바른 전화번호 길이가 아니에요'
      };
    }

    if (!phone.includes('-')) {
      return {
        isValid: false,
        message: '하이픈(-)을 포함해 입력해주세요'
      };
    }

    if (!phoneRegex.test(phone)) {
      return {
        isValid: false,
        message: '올바른 전화번호 형식이 아니에요 (예: 010-1234-5678)'
      };
    }

    return {
      isValid: true,
      message: '올바른 전화번호 형식이에요'
    };
  };

  const verifyCodeCheckMutation = useMutation({
    mutationFn: async ({email,verifyCode}) => {
      console.log('verifyCode',verifyCode);
      return await verifyCodeCheck(email,verifyCode);
    },
    onSuccess: (response) => {
      if(response.verified){
        setIsEmailLocked(true);
        alert(response.message);
      }else{
        alert("인증에 실패하였습니다");
        setIsSendEmailLocked(false);
        setFormData(prevState => ({
          ...prevState,
          verifyCode: "" 
        }));
      }
      
    }, 
  });

  const verifySendEmail = useMutation({
    mutationFn: async (email) => {
      return await sendEmail(email);
    },
    onSuccess: (response) => {
      alert(response);
      setIsSendEmailLocked(true);
    },
    onError: (error) => {
      alert("옳바르지 않은 이메일입니다.");
    }
  });

  // 닉네임 중복 체크 mutation
  const nameCheckMutation = useMutation({
    mutationFn: async (name) => {
      return await checkNameDuplicate(name);
    },
    onSuccess: (response) => {
      if (response.available) {
        setIsNameLocked(true);
        showTooltipMessage(response.message, true);
      } else {
        showTooltipMessage(response.message, false);
      }
    },
    onError: (error) => {
      showTooltipMessage("중복 확인 중 오류가 발생했어요.", false);
      console.error("중복확인 에러:", error);
    }
  });

  const validatePassword = (password) => {
    const conditions = {
      length: password.length >= 8,
      hasLetter: /[A-Za-z]/.test(password),
      hasNumber: /\d/.test(password)
    };

    const isValid = Object.values(conditions).every(condition => condition);
    
    if (!password) {
      return {
        isValid: false,
        message: ''
      };
    }

    if (!conditions.length) {
      return {
        isValid: false,
        message: '비밀번호는 8자 이상이어야 해요'
      };
    }

    if (!conditions.hasLetter || !conditions.hasNumber) {
      return {
        isValid: false,
        message: '영문과 숫자를 모두 포함해야 해요'
      };
    }

    return {
      isValid: true,
      message: '사용 가능한 비밀번호예요'
    };
  };

  // 회원가입 mutation
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      return await register(userData);
    },
    onSuccess: (response) => {
      console.log('회원 가입 성공:', response.data);
      onRegisterSuccess?.();
      onClose();
    },
    onError: (error) => {
      alert(error.response.data);

      const errorMessage = error.response?.data?.message || '회원가입에 실패했어요.';
      showTooltipMessage(errorMessage, false);
      
    }
  });

  // 툴팁 메시지 표시 함수
  const showTooltipMessage = (message, isSuccess) => {
    setShowTooltip(true);
    nameCheckMutation.data = { 
      available: isSuccess, 
      message 
    };
    setTimeout(() => setShowTooltip(false), 2000);
  };

  const [passwordMatch, setPasswordMatch] = useState({
    isMatching: false,
    message: '',
    show: false
  });

  // 비밀번호 유효성 검사 상태
  const [passwordValid, setPasswordValid] = useState({
    isValid: false,
    message: '',
    show: false
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const validationResult = validatePhone(formData.tel);
    setPhoneValid({
      isValid: validationResult.isValid,
      message: validationResult.message,
      show: !!formData.tel
    });
  }, [formData.tel]);
  

  useEffect(() => {
    // 비밀번호 유효성 검사
    const validationResult = validatePassword(formData.password);
    setPasswordValid({
      isValid: validationResult.isValid,
      message: validationResult.message,
      show: !!formData.password
    });

    

    // 비밀번호 일치 여부 검사
    if (formData.password || formData.passwordConfirm) {
      const isMatching = formData.password === formData.passwordConfirm;
      setPasswordMatch({
        isMatching,
        message: formData.passwordConfirm 
          ? (isMatching ? '비밀번호가 일치해요' : '비밀번호가 일치하지 않아요')
          : '',
        show: !!formData.passwordConfirm
      });
    } else {
      setPasswordMatch({
        isMatching: false,
        message: '',
        show: false
      });
    }
  }, [formData.password, formData.passwordConfirm]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && isNameLocked) {
      return;
    }
    if(name === 'verifyCode' && !isSendEmailLocked){
      return;
    } 
  
    console.log('name : ',name);
    console.log('value:',value);
    // 전화번호 입력 시 자동 하이픈 추가
    if (name === 'tel') {
      // 숫자만 추출
      const numbers = value.replace(/[^0-9]/g, '');
      
      // 자동 하이픈 추가
      let formattedNumber = '';
      if (numbers.length <= 3) {
        formattedNumber = numbers;
      } else if (numbers.length <= 7) {
        formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      } else {
        formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedNumber
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'name' ? value.trim() : value
      }));
    }
  
    if (name === 'name') {
      setIsNameLocked(false);
      nameCheckMutation.reset();
    }

    if(name === 'verifyCode'){
      setFormData(prev => ({
        ...prev,
        [name] : name === 'verifyCode' ? value.trim() : value
      }));
      console.log("formData.verifyCode",formData.verifyCode);
    }
  };

  const handleLoginClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      onLoginClick?.();
    }, 500);
  };

  const handleUnlockName = () => {
    setIsNameLocked(false);
    nameCheckMutation.reset();
  };

  const validateForm = () => {
    const validations = [
      {
        condition: !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        message: '올바른 이메일 형식이 아니에요.'
      },
      {
        condition: !formData.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        message: '비밀번호는 8자 이상의 문자와 숫자 조합이어야 해요.'
      },
      {
        condition: formData.password !== formData.passwordConfirm,
        message: '비밀번호가 일치하지 않아요.'
      },
      {
        condition: formData.name.length < 2,
        message: '이름은 2자 이상이어야 해요.'
      },
      {
        condition: !formData.tel.match(/^\d{3}-\d{3,4}-\d{4}$/),
        message: '올바른 전화번호 형식이 아니에요. (예: 010-1234-5678)'
      }
    ];

    const error = validations.find(v => v.condition);
    if (error) {
      showTooltipMessage(error.message, false);
      return false;
    }
    return true;
  };

  const handleVerifyCheck = () => {
    if(!formData.verifyCode){
      alert("인증 코드를 입력해주세요");
      return;
    }
    console.log("handleVerifyCheck : ",formData.verifyCode);
    return verifyCodeCheckMutation.mutate({
      email : formData.email,
      verifyCode : formData.verifyCode});
  }

  const handleSendMail = () => {
    if(!formData.email){
      return;
    }
    verifySendEmail.mutate(formData.email);
  }

  const handleNameCheck = () => {
    if (!formData.name) {
      showTooltipMessage('닉네임을 입력해주세요.', false);
      return;
    }
    nameCheckMutation.mutate(formData.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    registerMutation.mutate(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={handleClose}
      />

      <div className={`
        relative w-full max-w-lg z-[1000]
        bg-white rounded-lg shadow-xl
        transform transition-all duration-300
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>
        {/* 기존 UI 코드와 동일하지만 상태는 mutation으로 관리  */}
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
            {/* 이메일 입력 */}
            <div className="flex gap-2">
              <div className="relative flex items-center w-[70%]">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={registerMutation.isPending}
                  required
                />
              </div>
              <button
                    type="button"
                    onClick={handleSendMail}
                    disabled={isSendEmailLocked || verifySendEmail.isPending || registerMutation.isPending}
                    className={`w-[30%] py-2 px-4 rounded-lg border 
                      transition-colors duration-300 font-size-sm
                      ${isEmailLocked 
                        ? 'bg-green-100 text-green-800 border-green-500' 
                        : isEmailLocked || verifySendEmail.isPending
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed opacity-70 border-gray-300'
                          : 'bg-white hover:bg-gray-300 text-black border-gray-500'}`}
                  >
                    {verifySendEmail.isPending ? '전송 중...'  : isSendEmailLocked ? '전송 완료' : '코드 전송'}
              </button>
            </div>


            <div className="flex gap-2">
              <div className="relative flex items-center w-[70%]">
                <input
                  type="text"
                  name="verifyCode"
                  value={formData.verifyCode}
                  onChange={handleChange}
                  placeholder="인증코드"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={registerMutation.isPending}
                  required
                />
              </div>
              <button
                    type="button"
                    onClick={handleVerifyCheck}
                    disabled={isEmailLocked || verifyCodeCheckMutation.isPending || registerMutation.isPending}
                    className={`w-[30%] py-2 px-4 rounded-lg border 
                      transition-colors duration-300 font-size-sm
                      ${isEmailLocked 
                        ? 'bg-green-100 text-green-800 border-green-500' 
                        : isEmailLocked || verifyCodeCheckMutation.isPending
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed opacity-70 border-gray-300'
                          : 'bg-white hover:bg-gray-300 text-black border-gray-500'}`}
                  >
                    {verifyCodeCheckMutation.isPending ? '인증 확인 중...'  : isEmailLocked ? '인증 완료' : '코드 확인'}
              </button>
            </div>

            
            

            {/* 비밀번호 입력 */}
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호 (8자 이상, 문자/숫자 조합)"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${passwordValid.show && (passwordValid.isValid ? 'border-green-500' : 'border-red-500')}`}
                disabled={registerMutation.isPending}
                required
              />
              {/* 비밀번호 유효성 메시지 */}
              {passwordValid.show && (
                <div className={`absolute -bottom-6 left-0 text-sm
                  ${passwordValid.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordValid.message}
                </div>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div className="relative mt-8 pt-3">
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="비밀번호 확인"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${passwordMatch.show && (passwordMatch.isMatching ? 'border-green-500' : 'border-red-500')}`}
                disabled={registerMutation.isPending}
                required
              />
              {/* 비밀번호 일치 여부 메시지 */}
              {passwordMatch.show && (
                <div className={`absolute -bottom-6 left-0 text-sm
                  ${passwordMatch.isMatching ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordMatch.message}
                </div>
              )}
            </div>

            {/* 닉네임 입력 영역 */}
            <div className='relative pt-3'>
              <div className="flex gap-2">
                <div className="relative flex items-center w-[70%]">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="닉네임"
                    disabled={isNameLocked || registerMutation.isPending}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      ${isNameLocked ? 
                        'bg-gray-100 cursor-not-allowed opacity-70 border-gray-300' : 
                        'bg-white'}`}
                    required
                  />
                  {isNameLocked && (
                    <button
                      type="button"
                      onClick={handleUnlockName}
                      className="absolute -right-10 top-1/2 transform -translate-y-1/2 
                              text-gray-500 hover:text-gray-700 bg-transparent p-1 
                              rounded-full hover:bg-green-400 transition-colors"
                      disabled={registerMutation.isPending}
                    >
                      ✎
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleNameCheck}
                  disabled={isNameLocked || nameCheckMutation.isPending || registerMutation.isPending}
                  className={`w-[30%] py-2 px-4 rounded-lg border 
                    transition-colors duration-300 font-size-sm
                    ${isNameLocked 
                      ? 'bg-green-100 text-green-800 border-green-500' 
                      : isNameLocked || nameCheckMutation.isPending
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed opacity-70 border-gray-300'
                        : 'bg-white hover:bg-gray-300 text-black border-gray-500'}`}
                >
                  {nameCheckMutation.isPending ? '확인 중...' : isNameLocked ? '확인 완료' : '중복 확인'}
                </button>
              </div>

              {/* 툴팁 메시지 */}
              {showTooltip && nameCheckMutation.data?.message && (
                <div className={`
                  absolute -top-12 right-0 
                  px-3 py-2 rounded-lg
                  ${nameCheckMutation.data?.available 
                    ? 'bg-green-50 bg-opacity-90 text-green-700' 
                    : 'bg-red-50 bg-opacity-90 text-red-700'}
                  backdrop-blur-sm text-sm
                  shadow-lg z-10
                  border border-opacity-20
                  ${nameCheckMutation.data?.available 
                    ? 'border-green-200' 
                    : 'border-red-200'}
                `}>
                  <p className="flex items-center gap-1">
                    {nameCheckMutation.data?.available ? '✓' : '!'} {nameCheckMutation.data?.message}
                  </p>
                </div>
              )}
            </div>

            {/* 전화번호 입력 */}
            <div className="relative pb-3">
              <input
                type="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="전화번호 (예: 010-1234-5678)"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${phoneValid.show && (phoneValid.isValid ? 'border-green-500' : 'border-red-500')}`}
                disabled={registerMutation.isPending}
                required
              />
              {/* 전화번호 유효성 메시지 */}
              {phoneValid.show && (
                <div className={`absolute -bottom-6 left-0 text-sm pb-3
                  ${phoneValid.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {phoneValid.message}
                </div>
              )}
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              disabled={
                !isEmailLocked ||
                !isNameLocked || 
                !passwordMatch.isMatching || 
                !passwordValid.isValid || 
                !phoneValid.isValid || 
                registerMutation.isPending
              }
              //버튼
              className={`w-full py-2 px-4 rounded-lg
                transition-colors duration-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${(isEmailLocked && isNameLocked && passwordMatch.isMatching && passwordValid.isValid && phoneValid.isValid)
                  ? 'bg-green-600 hover:bg-green-900 text-white cursor-pointer' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {registerMutation.isPending 
                ? '가입 처리 중...' 
                : ( !isEmailLocked
                  ? '이메일 인증이 필요해요'
                    : !isNameLocked 
                      ? '닉네임 중복 확인이 필요해요'
                      : !passwordValid.isValid
                        ? '비밀번호 조건을 만족해야 해요'
                        : !passwordMatch.isMatching
                          ? '비밀번호가 일치하지 않아요'
                          : !phoneValid.isValid
                            ? '올바른 전화번호를 입력해주세요'
                            : '가입하기')}
            </button>

            {/* 로그인 링크 */}
            <div className="text-center text-sm text-gray-600">
              이미 계정이 있으신가요?{' '}
              <button 
                type="button"
                onClick={handleLoginClick}
                className="text-green-500 hover:text-green-900 font-bold"
                disabled={registerMutation.isPending}
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

export default RegisterForm;