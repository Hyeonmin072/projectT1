// constants/games.js

import anipangImg from '../assets/games/anipang.png';
import candyImg from '../assets/games/candy.jpg';
import lolImg from '../assets/games/lol.jpg';
import lostarkImg from '../assets/games/lostark.png';
import starcraftImg from '../assets/games/starcraft.png';
import osuImg from '../assets/games/osu.png';
import mapleImg from '../assets/games/maple.png';
import eternalreturnImg from '../assets/games/eternal.png';
import minecraftImg from '../assets/games/mine.png';
import df from '../assets/games/df.jpg';
import poket from '../assets/games/poket.png';

export const GAME_LIST = [
    { 
      id: 6, 
      name: '애니팡', 
      image: anipangImg,
      description: '매칭 퍼즐 게임'
    },

    { 
      id: 5, 
      name: '캔디크러시사가', 
      image: candyImg,
      description: '매칭 퍼즐 게임'
    },
    { 
      id: 4, 
      name: '리그오브레전드', 
      image: lolImg,
      description: 'MOBA 게임'
    },
    { 
      id: 3, 
      name: '로스트아크', 
      image: lostarkImg,
      description: 'MMORPG'
    },
    { 
      id: 2, 
      name: '스타크래프트', 
      image: starcraftImg,
      description: 'RTS 게임'
    },
    { 
      id: 7, 
      name: '오스', 
      image: osuImg,
      description: '리듬 게임'
    },
    { 
        id: 8, 
        name: '이터널리턴', 
        image: eternalreturnImg,
        description: 'MOBA 게임'
      },
    { 
        id: 9, 
        name: '마인크래프트', 
        image: minecraftImg,
        description: 'MMORPG'
      },
    { 
        id: 10, 
        name: '메이플스토리', 
        image: mapleImg,
        description: 'MMORPG'
      },
    { 
        id: 11, 
        name: '던전앤파이터', 
        image: df,
        description: 'MMORPG'
      },
    { 
        id: 12, 
        name: '포켓몬 카드 게임', 
        image: poket,
        description: 'MMORPG'
      },

  ];
  
  export const getGameNameById = (gameId) => {
    const game = GAME_LIST.find(game => game.id === gameId);
    return game ? game.name : gameId;
  };