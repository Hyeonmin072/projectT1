// components/common/ErrorMessage.jsx
import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="flex items-center gap-2 text-red-600">
        <AlertCircle className="w-6 h-6" />
        <p className="font-medium">
          {message || '오류가 발생했습니다. 다시 시도해 주세요.'}
        </p>
      </div>
    </div>
  );
};

export default ErrorMessage;