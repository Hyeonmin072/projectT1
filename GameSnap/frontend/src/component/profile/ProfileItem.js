// components/profile/ProfileItem.jsx
import React from 'react';
import { Edit } from 'lucide-react';

const ProfileItem = ({ icon: Icon, label, value, action, isContent }) => (
  <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
    <Icon className="w-5 h-5 text-gray-500 mr-3" />
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className={`text-base font-semibold text-gray-900 ${isContent ? 'whitespace-pre-wrap' : ''}`}>
        {value || "정보 없음"}
      </p>
    </div>
    {action && (
      <button
        onClick={action.onClick}
        className="ml-4 flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-700 rounded-full border border-green-200 hover:border-green-300 transition-all duration-200"
      >
        <Edit className="w-4 h-4" />
        {action.label}
      </button>
    )}
  </div>
);

export default ProfileItem;