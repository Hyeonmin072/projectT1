// SearchBar.js
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleClear = () => {
    setSearchTerm('');
    setIsDropdownVisible(false);
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value) {
      // 검색어가 있을 때 드롭다운 표시
      setIsDropdownVisible(true);
    } else {
      // 검색어가 없을 때 드롭다운 숨기기
      setIsDropdownVisible(false);
    }
  };

  return (
    <div className="relative max-w-xl w-full">
      <div className={`
        flex items-center bg-white bg-opacity-10 rounded-full
        transition-all duration-300
        ${isFocused ? 'bg-opacity-20 ring-2 ring-green-500' : 'hover:bg-opacity-15'}
      `}>
        <Search 
          className="h-5 w-5 text-gray-300 ml-4" 
        />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            // 포커스를 잃었을 때 바로 드롭다운을 숨기지 않고 약간의 딜레이를 줍니다
            // 이는 드롭다운 내의 항목을 클릭할 수 있게 해줍니다
            setTimeout(() => {
              setIsDropdownVisible(false);
            }, 200);
          }}
          placeholder="검색"
          className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-300 
                     focus:outline-none"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="p-2 hover:text-green-500 transition-colors mr-2"
          >
            <X className="h-5 w-5 text-gray-300 hover:text-green-500" />
          </button>
        )}
      </div>
      
      {/* 검색 결과 드롭다운 - 애니메이션 적용 */}
      <div className={`
        absolute mt-2 w-full bg-white rounded-lg shadow-lg 
        border border-gray-200 overflow-hidden
        transition-all duration-700 ease-in-out
        origin-top
        ${isDropdownVisible && searchTerm 
          ? 'opacity-100 transform scale-y-100 translate-y-0' 
          : 'opacity-0 transform scale-y-95 -translate-y-4 pointer-events-none'}
      `}>
        <div className="p-4 border-b">
          <p className="text-sm text-gray-500">
            '{searchTerm}'에 대한 검색 결과
          </p>
        </div>
        
        {/* 검색 결과 항목들 */}
        <div className="max-h-80 overflow-y-auto">
          {/* 검색 결과 아이템들 */}
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className={`
                p-3 hover:bg-gray-100 cursor-pointer
                transition-all duration-200
                transform hover:scale-[0.99]
              `}
              style={{
                // 각 항목별로 살짝 딜레이를 주어 순차적으로 나타나는 효과
                transitionDelay: `${i * 50}ms`
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div>
                  <p className="font-medium">검색 결과 {i + 1}</p>
                  <p className="text-sm text-gray-500">관련 게임 설명...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;