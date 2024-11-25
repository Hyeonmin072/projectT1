import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";


const GameCategories = ({ gameCategories, selectedGame, setSelectedGame }) => {
    const scrollContainerRef = useRef(null);
  
    const scroll = (direction) => {
      if (scrollContainerRef.current) {
        const scrollAmount = 200;
        const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
        scrollContainerRef.current.scrollTo({
          left: newScrollPosition,
          behavior: 'smooth'
        });
      }
    };
  
    if (gameCategories.length === 0) {
      return <div className="p-4">게임 목록을 불러오는 중...</div>;
    }
  
    return (
      <div className="relative w-full group ">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
  
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto no-scrollbar"
        >
          <div className="flex gap-2 py-4 min-w-min">
            {gameCategories.map((game) => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                className={`
                  px-4 py-2 rounded-lg border transition-all duration-300 
                  flex items-center gap-2 whitespace-nowrap pr-8
                  ${selectedGame === game.id
                    ? 'bg-white text-black border-green-500'
                    : 'border-gray-300 hover:bg-green-400'
                  }
                `}
              >
                {game.image && (
                  <img 
                    src={game.image} 
                    alt={game.name} 
                    className="w-6 h-6 rounded object-cover"
                  />
                )}
                {game.name || '알 수 없는 게임'}
              </button>
            ))}
          </div>
        </div>
  
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        > 
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  export default GameCategories;