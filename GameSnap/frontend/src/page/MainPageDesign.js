import React, { useEffect, useState } from 'react';

const MainPageDesign = () => {
  const [gifUrl, setGifUrl] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [currentGifIndex, setCurrentGifIndex] = useState(0);

  // 여러 GIF URL을 배열로 저장 (예시)
  const gifUrls = [
    'https://media.giphy.com/media/8X2BeGIQ2Zqpd6mAQs/giphy.gif?cid=790b761186w82fh7pau1p78oju7e7glemdk4ky0apbirn57e&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    'https://media.giphy.com/media/4nSJj1CJi1II6lItc9/giphy.gif?cid=790b761121adsckdfzinyzy3e203c05tsnvng9rdumkq1h7m&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    'https://media.giphy.com/media/0pWnUfKhqZgX11bPvz/giphy.gif?cid=790b7611rxqd7x2adi7o1wnjwq33wtfe00ch1gfurjjnvdtu&ep=v1_gifs_search&rid=giphy.gif&ct=g',
  ];

  // GIF URL을 변경하는 함수
  const changeGif = () => {
    setIsFading(true);  
    setTimeout(() => {
      setOpacity(0); 
      setTimeout(() => {
        setCurrentGifIndex((prevIndex) => (prevIndex + 1) % gifUrls.length); // 다음 GIF로 변경
        setOpacity(1); // 새로운 GIF로 전환 후 배경을 다시 원래대로
        setIsFading(false); 
      }, 500); 
    }, 1000); 
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeGif(); // 주기적으로 GIF 변경
    }, 3000); 

    return () => clearInterval(interval); // 컴포넌트가 언마운트되면 interval 제거
  }, []);

  useEffect(() => {
    setGifUrl(gifUrls[currentGifIndex]); // 현재 인덱스에 맞는 GIF URL 설정
  }, [currentGifIndex]);

  return (
    <div className="relative h-screen z-30">
      <div
        className="absolute w-full h-full z-10 transition-opacity duration-1000"
        style={{
          opacity: opacity,
          backgroundImage: `url(${gifUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="relative z-20 flex items-center justify-center h-full p-4">
        <p className="text-4xl mb-4 border-t-4 border-b-4 border-white text-white pt-10 pb-10 px-4">
          GAMESNAP에서 게임의 새로운 즐거움을 만나세요!
        </p>
      </div>
    </div>
  );
};

export default MainPageDesign;
