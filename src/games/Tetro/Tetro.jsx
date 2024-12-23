import { useEffect, useRef, useState } from 'react';
import Page from '../../components/Page';
import './tetroStyle.css';
import Modal from '../../components/Modal';
import { DifficultyPicker } from '../../components/DifficultyPicker';

let intervalObj = null;

export const Tetro = () => {
  const createCell = () => ({ value: 0, fix: false, color: 'bg-black' });
  const getDefaultBoard = () => {
    return Array.from({ length: 20 }, () =>
      Array.from({ length: 10 }, () => createCell())
    );
  };

  const [board, setBoard] = useState(getDefaultBoard());
  const [gameOver, setGameOver] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const curBlock = useRef({ fix: false, blocks: [] });
  const fixedBlockCountRef = useRef(0);
  const [rowsFilled, setRowsFilled] = useState(0);

  const boardRef = useRef(board); // Add this to keep the current board state in sync with React state

  const updateBoard = (newBoard) => {
    boardRef.current = newBoard; // Update the ref
    setBoard(newBoard); // Update React state
  };

  const endGame = () => {
    clearInterval(intervalObj);
    intervalObj = null;
    setGameOver(true);
    setGameEnd(true);
  };

  const genereteRandomShape = () => {
    const curBoard = boardRef.current; // Use the latest board from the ref
    const options = [
      // [1, 1],
      [1, 2],
      [2, 2],
      // [1, 4],
      [4, 1],
    ];
    const randomLength = Math.floor(Math.random() * options.length);
    const newBoard = structuredClone(curBoard);
    const blocks = [];
    for (let i = options[randomLength][0] - 1; i >= 0; i--) {
      for (let j = 0; j < options[randomLength][1]; j++) {
        if (newBoard[i][j].fix) {
          endGame();
          return;
        }
        newBoard[i][j].value = 1;
        newBoard[i][j].color = `color-${randomLength}`;
        blocks.push({ i, j });
      }
    }
    curBlock.current.blocks = blocks;
    curBlock.current.fix = false;
    updateBoard(newBoard); // Update the board synchronously
  };

  const adjustBoard = (newBoard, i, j, x, y, length) => {
    let condition = true;
    curBlock.current.blocks.forEach(({ i: bi, j: bj }) => {
      if (y > j)
        condition = condition && bj + 1 < length && !newBoard[bi][bj + 1].fix;
      if (x > i)
        condition =
          condition && bi + 1 < newBoard.length && !newBoard[bi + 1][bj].fix;
      if (y < j)
        condition = condition && bj - 1 >= 0 && !newBoard[bi][bj - 1].fix;
      if (x < i)
        condition = condition && bi - 1 >= 0 && !newBoard[bi - 1][bj].fix;
    });

    if (condition && !curBlock.current.fix) {
      newBoard[i][j].value = 0;
      newBoard[x][y].value = 1;
      newBoard[x][y].color = newBoard[i][j].color;
      newBoard[i][j].color = 'bg-black';
      return { i: x, j: y };
    } else {
      if (y != j) {
        return { i, j };
      }
      newBoard[i][j].fix = true;
      curBlock.current.fix = true;
      fixedBlockCountRef.current += 1;
      return { i, j };
    }
  };

  const moveBlock = () => {
    const curBoard = boardRef.current; // Use the latest board from the ref
    const newBoard = structuredClone(curBoard);
    const updatedBlocks = curBlock.current.blocks.map(({ i, j }) => {
      return adjustBoard(newBoard, i, j, i + 1, j, newBoard.length);
    });

    curBlock.current.blocks = updatedBlocks;
    updateBoard(newBoard); // Update the board synchronously
  };

  const isRowFilled = (curBoard, row) => {
    return curBoard[row].every(
      (cell) => cell.value === 1 && cell.color !== 'color-finished'
    );
  };

  const handleClick = () => {
    if (intervalObj || gameEnd) {
      if (gameEnd) {
        setGameOver(true);
      }
      return;
    }
    genereteRandomShape();
    let numFixedBlock = 0;
    intervalObj = setInterval(() => {
      moveBlock(); // Updates board via boardRef and setBoard

      if (numFixedBlock !== fixedBlockCountRef.current) {
        numFixedBlock = fixedBlockCountRef.current;
        fillFixedRows();
        genereteRandomShape(); // Use boardRef and update synchronously
      }
    }, 200);
  };

  const moveLeft = () => {
    const curBoard = boardRef.current;
    const newBoard = structuredClone(curBoard);

    const updatedBlocks = curBlock.current.blocks.map(({ i, j }) => {
      return adjustBoard(newBoard, i, j, i, j - 1, newBoard[0].length);
    });

    curBlock.current.blocks = updatedBlocks;
    updateBoard(newBoard);
  };

  const moveRight = () => {
    const curBoard = boardRef.current;
    const newBoard = structuredClone(curBoard);
    const updatedBlocks = curBlock.current.blocks
      .slice()
      .reverse()
      .map(({ i, j }) => {
        return adjustBoard(newBoard, i, j, i, j + 1, newBoard[0].length);
      });

    curBlock.current.blocks = updatedBlocks.reverse();
    updateBoard(newBoard);
  };

  const moveDown = () => {
    const curBoard = boardRef.current;
    const newBoard = structuredClone(curBoard);
    const updatedBlocks = curBlock.current.blocks.map(({ i, j }) => {
      return adjustBoard(newBoard, i, j, i + 1, j, newBoard.length);
    });

    curBlock.current.blocks = updatedBlocks;
    updateBoard(newBoard);
  };

  const keyPress = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        moveLeft();
        break;
      case 'ArrowRight':
        moveRight();
        break;
      case 'ArrowDown':
        moveDown();
        break;
      default:
        break;
    }
  };

  const changeRowGreen = (row) => {
    const curBoard = boardRef.current;
    const newBoard = structuredClone(curBoard);
    newBoard[row].forEach((cell) => {
      cell.color = 'color-finished';
    });
    updateBoard(newBoard);
  };

  const fillFixedRows = () => {
    const curBoard = boardRef.current;
    setRowsFilled((prevRowsFilled) => {
      let filledRows = prevRowsFilled;
      for (let i = 0; i < curBoard.length; i++) {
        if (isRowFilled(curBoard, i)) {
          changeRowGreen(i);
          filledRows += 1;
          // newBoard.splice(i, 1);
          // newBoard.unshift(Array.from({ length: 10 }, () => createCell()));
        }
      }
      return filledRows;
    });
  };

  const getRules = () => {
    const rules = ['Easy', 'Medium', 'Hard', 'Expert'];

    return (rules.indexOf(difficulty) + 1) * 2;
  };

  useEffect(() => {
    let count = 0;
    boardRef.current.forEach((row) => {
      if (row.every((cell) => cell.color === 'color-finished')) {
        count += 1;
      }
    });

    if (difficulty != null && count >= getRules()) {
      clearInterval(intervalObj);
      intervalObj = null;
      setGameWin(true);
      setGameEnd(true);
    }
  }, [board]);

  const [difficulty, setDifficulty] = useState(null);

  useEffect(() => {
    if (difficulty === null) {
      clearInterval(intervalObj);
      intervalObj = null;
      setBoard(getDefaultBoard());
      boardRef.current = getDefaultBoard();
      setRowsFilled(0);
    }
  }, [difficulty]);

  return (
    <Page>
      {difficulty === null && (
        <Modal setFail={null} text={'Select Difficulty'}>
          <DifficultyPicker setFn={setDifficulty} />
          <button
            className="bg-red-500 text-white hover:bg-red-700 hover:border w-24 font-semibold rounded-2xl gap-2 md:text-2xl sm:text-lg text-xs shadow-2xl h-12"
            onClick={() => setDifficulty('Easy')}
          >
            CLOSE
          </button>
        </Modal>
      )}
      <div className="tetro-view flex flex-col items-center justify-around ml-6 pt-8 pl-2 pr-2 border border-black rounded-3xl">
        <span className="font-semibold text-3xl text-center">
          Get {difficulty === null ? '?' : getRules()} rows filled to win
        </span>
        <span className="text-xl mt-12"> Rows filled: {rowsFilled}</span>
        <button
          className="bg-black text-white hover:bg-white hover:border hover:border-black hover:text-black w-fit p-2 font-semibold rounded-2xl gap-2 md:text-2xl sm:text-lg text-xs shadow-2xl"
          onClick={() => setDifficulty(null)}
        >
          Set Difficulty
        </button>
      </div>
      <div
        className="tetro-view parent-tetro flex flex-col border border-black bg-deepNavy gap-0.5 p-1 rounded-xl"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={keyPress}
      >
        {board.map((row, i) => {
          return (
            <div key={i} className="flex-grow flex w-full gap-0.5">
              {row.map((col, j) => {
                return (
                  <div
                    className={`rounded-md space-x-1 space-y-1 flex w-full ${col.color}`}
                    key={j}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
      {gameOver && (
        <Modal
          setFail={() => {
            setGameOver(false);
          }}
          text={'Game Over'}
        />
      )}

      {gameWin && (
        <Modal
          setFail={() => {
            setGameWin(false);
          }}
          text={'Game Won'}
        />
      )}
    </Page>
  );
};
