import { useEffect, useRef, useState } from 'react';
import Page from '../../components/Page';
import { shuffleArray } from '../../helper';
import { ResetButton } from '../../components/ResetButton';
import Modal from '../../components/Modal';

export const Slido = () => {
  const [board, setBoard] = useState([[], [], []]);
  const divRef = useRef(null);
  const [curCell, setCurCell] = useState({ x: 2, y: 2 });
  const [gameWon, setGameWon] = useState(false);
  useEffect(() => {
    // Focus the div when the component is mounted
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  const generateGame = () => {
    const game = [[], [], []];

    const images = import.meta.glob('./assets/*.png', { eager: true });
    let curBoardLayer = -1;

    const randomizedImages = shuffleArray(Object.entries(images));
    randomizedImages.forEach(([_, module], index) => {
      curBoardLayer = Math.floor(index / 3);
      game[curBoardLayer].push(module.default);
    });

    game[curBoardLayer].push('');
    return game;
  };

  useEffect(() => {
    setBoard(generateGame());
  }, []);

  const upInteract = (x, y, newBoard) => {
    if (y - 1 >= 0 && y - 1 < 2 && newBoard[x][y - 1] === '') {
      newBoard[x][y - 1] = newBoard[x][y];
      newBoard[x][y] = '';
      setBoard(newBoard);
      setCurCell({ x, y });
      return;
    }
  };

  const downInteract = (x, y, newBoard) => {
    if (y + 1 < 3 && y + 1 > 0 && newBoard[x][y + 1] === '') {
      newBoard[x][y + 1] = newBoard[x][y];
      newBoard[x][y] = '';
      setBoard(newBoard);
      setCurCell({ x, y });
      return;
    }
  };

  const leftInteract = (x, y, newBoard) => {
    if (x - 1 >= 0 && x - 1 < 2 && newBoard[x - 1][y] === '') {
      newBoard[x - 1][y] = newBoard[x][y];
      newBoard[x][y] = '';
      setBoard(newBoard);
      setCurCell({ x, y });
      return;
    }
  };

  const rightInteract = (x, y, newBoard) => {
    if (x + 1 < 3 && x + 1 > 0 && newBoard[x + 1][y] === '') {
      newBoard[x + 1][y] = newBoard[x][y];
      newBoard[x][y] = '';
      setBoard(newBoard);
      setCurCell({ x, y });
      return;
    }
  };

  const handleClick = (x, y) => {
    const newBoard = structuredClone(board);

    upInteract(x, y, newBoard);
    downInteract(x, y, newBoard);
    leftInteract(x, y, newBoard);
    rightInteract(x, y, newBoard);
  };

  const handleKeyPress = (e) => {
    const newBoard = structuredClone(board);
    switch (e.key) {
      case 'ArrowUp':
        upInteract(curCell.x, curCell.y + 1, newBoard);
        break;
      case 'ArrowDown':
        downInteract(curCell.x, curCell.y - 1, newBoard);
        break;
      case 'ArrowLeft':
        leftInteract(curCell.x + 1, curCell.y, newBoard);
        break;
      case 'ArrowRight':
        rightInteract(curCell.x - 1, curCell.y, newBoard);
        break;
    }
  };

  const getSolution = () => {
    const game = [[], [], []];

    const images = import.meta.glob('./assets/*.png', { eager: true });
    let curBoardLayer = -1;
    Object.entries(images).forEach(([_, module], index) => {
      curBoardLayer = Math.floor(index / 3);
      game[curBoardLayer].push(module.default);
    });
    game[curBoardLayer].push('');
    return game;
  };

  useEffect(() => {
    const game = getSolution();
    if (JSON.stringify(game) === JSON.stringify(board)) {
      setTimeout(() => {
        setGameWon(true);
      }, 0);
    }
  }, [board]);

  return (
    <Page>
      <div ref={divRef} tabIndex={-1} onKeyDown={(e) => handleKeyPress(e)}>
        <div className="flex flex-col ">
          {board.map((row, x) => {
            return (
              <div key={x} className="flex">
                {row.map((column, y) => {
                  return (
                    <>
                      {column !== '' ? (
                        <img
                          key={y}
                          src={column}
                          alt={`img-${x}`}
                          className="md:h-[150px] md:w-[150px] sm:h-32 sm:w-32 h-20 w-20 border border-black"
                          onClick={() => handleClick(x, y)}
                        />
                      ) : (
                        <div
                          key={y}
                          className="md:h-[150px] md:w-[150px] sm:h-32 sm:w-32 h-20 w-20 border border-black"
                          onClick={() => handleClick(x, y)}
                        ></div>
                      )}
                    </>
                  );
                })}
              </div>
            );
          })}
          <ResetButton setFn={setBoard} generateGame={generateGame} />
        </div>
      </div>
      {gameWon && (
        <Modal
          setFail={() => {
            setGameWon(false);
          }}
          text={'Game Won'}
        />
      )}
    </Page>
  );
};
