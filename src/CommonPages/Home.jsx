import IconCard from '../components/IconCard';
import GameIcon from '../../public/game.svg';
import '../cssStyles/pageStyle.css';

const Home = () => {
  const games = [
    'Blanko',
    'Tic Tac Toe',
    '2048',
    'Word Colour',
    'Sudoku',
    'Slido',
    'Tetro',
  ];

  const getImages = () => {
    const importImages = import.meta.glob('../assets/*.png', { eager: true });
    return Object.entries(importImages).map(([_, module]) => module.default);
  };
  const images = getImages();

  return (
    <>
      <div className="bg-deepNavy">
        <div className="fixed pt-4 pb-4 text-2xl md:text-4xl font-semibold flex justify-start text-white border-b border-gray-700 z-50 bg-deepNavy w-full max-h-16">
          <div className="flex gap-3 ml-4">
            <img src={GameIcon} alt="Game Icon" className="md:h-10 h-8" />
            <span>GamesHub</span>
          </div>
        </div>
        <div className="flex justify-center items-start view overflow-auto">
          <div className="flex justify-center text-black rounded-md gap-6 w-3/4 flex-wrap pt-8 pb-8 flex-grow mt-16">
            {images.map((image, y) => {
              return (
                <>
                  <div key={y} className="row">
                    <IconCard
                      image={image}
                      text={games[y]}
                      path={games[y].toLowerCase()}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
