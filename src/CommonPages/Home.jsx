import { useNavigate } from 'react-router-dom';

const Home = () => {
  const games = ['Blanko', 'TicTacToe', '2048', 'Word Colour', 'h', 'h'];
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(`/${path.toLowerCase().replaceAll(' ', '')}`);
  };

  return (
    <>
      <div className='mt-20 md:mt-12 text-4xl md:text-7xl bg-transparent font-semibold flex justify-center fixed w-screen '>
        GamesHub
      </div>
      <div className='flex justify-center items-center h-screen bg-teal'>
        <div className='flex  justify-center items-center flex-row text-black rounded-md gap-6 w-3/4 flex-wrap basis-1/2'>
          {games.map((path, y) => {
            return (
              <>
                <div
                  key={y}
                  className='row rounded-xl shadow-xl font-semibold text-sm md:text-2xl text-wrap bg-white break-words'
                >
                  <button
                    className={`border border-black w-16 md:w-40 h-16 md:h-32 rounded-xl`}
                    onClick={() => handleNavigate(path)}
                  >
                    {path}
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
