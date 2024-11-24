// constants/games.js

import anipangImg from '../assets/games/anipang.png';
import candyImg from '../assets/games/candy.jpg';
import lolImg from '../assets/games/lol.jpg';
import lostarkImg from '../assets/games/lostark.png';
import starcraftImg from '../assets/games/starcraft.png';
import osuImg from '../assets/games/osu.png';
import mapleImg from '../assets/games/maple.png';

export const GAME_LIST = [
    { 
      id: 'anipang', 
      name: '애니팡', 
      image: anipangImg,
      description: '매칭 퍼즐 게임'
    },

    { 
      id: 'candycrushsaga', 
      name: '캔디크러시사가', 
      image: candyImg,
      description: '매칭 퍼즐 게임'
    },
    { 
      id: 'lol', 
      name: '리그오브레전드', 
      image: lolImg,
      description: 'MOBA 게임'
    },
    { 
      id: 'lostark', 
      name: '로스트아크', 
      image: lostarkImg,
      description: 'MMORPG'
    },
    { 
      id: 'starcraft', 
      name: '스타크래프트', 
      image: starcraftImg,
      description: 'RTS 게임'
    },
    { 
      id: 'osu', 
      name: '오스', 
      image: osuImg,
      description: '리듬 게임'
    },
    { 
        id: 'maple', 
        name: '메이플스토리', 
        image: mapleImg,
        description: 'MMORPG'
      },
  ];
  
  export const getGameNameById = (gameId) => {
    const game = GAME_LIST.find(game => game.id === gameId);
    return game ? game.name : gameId;
  };