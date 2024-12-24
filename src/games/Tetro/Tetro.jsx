import { useEffect, useRef, useState } from 'react';
import Page from '../../components/Page';
import './tetroStyle.css';
import Modal from '../../components/Modal';
import { StartModal } from './components/StartModal';
import { endGame, getDefaultBoard, getRules, updateBoard } from './util';
import { SidePanel } from './components/SidePanel';
import { Board } from './components/Board';

export const Tetro = () => {
  const [board, setBoard] = useState(getDefaultBoard());
  const [gameOver, setGameOver] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const curBlock = useRef({ fix: false, blocks: [] });
  const fixedBlockCountRef = useRef(0);
  const [rowsFilled, setRowsFilled] = useState(0);
  const [difficulty, setDifficulty] = useState(null);

  const boardRef = useRef(board); // Add this to keep the current board state in sync with React state
  const intervalObj = useRef(null);

  const genereteRandomShape = () => {
    const curBoard = boardRef.current; // Use the latest board from the ref
    const options = [
      [1, 1],
      [1, 2],
      [2, 2],
      [1, 4],
      [4, 1],
    ];
    const randomLength = Math.floor(Math.random() * options.length);
    const newBoard = structuredClone(curBoard);
    const blocks = [];
    for (let i = options[randomLength][0] - 1; i >= 0; i--) {
      for (let j = 0; j < options[randomLength][1]; j++) {
        if (newBoard[i][j].fix) {
          endGame(intervalObj.current, setGameOver, setGameEnd);
          return;
        }
        newBoard[i][j].value = 1;
        newBoard[i][j].color = `color-${randomLength}`;
        blocks.push({ i, j });
      }
    }
    curBlock.current.blocks = blocks;
    curBlock.current.fix = false;
    updateBoard(boardRef, newBoard, setBoard); // Update the board synchronously
  };

  useEffect(() => {
    let count = 0;
    boardRef.current.forEach((row) => {
      if (row.every((cell) => cell.color === 'color-finished')) {
        count += 1;
      }
    });

    if (difficulty != null && count >= getRules(difficulty)) {
      clearInterval(intervalObj.current);
      intervalObj.current = null;
      setGameWin(true);
      setGameEnd(true);
    }
  }, [board]);

  useEffect(() => {
    if (difficulty === null) {
      // Clear the interval
      clearInterval(intervalObj.current);
      intervalObj.current = null;

      // Reset the board
      const defaultBoard = getDefaultBoard();
      setBoard(defaultBoard);
      boardRef.current = defaultBoard;

      // Reset game state
      setRowsFilled(0);
      setGameWin(false);
      setGameEnd(false);

      // Reset block references
      curBlock.current = { fix: false, blocks: [] };
      fixedBlockCountRef.current = 0;
    }
  }, [difficulty]);

  return (
    <Page>
      {difficulty === null && <StartModal setDifficulty={setDifficulty} />}
      <SidePanel
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        rowsFilled={rowsFilled}
        boardRef={boardRef}
        curBlocks={curBlock.current}
        setBoard={setBoard}
        countRef={fixedBlockCountRef}
      />
      <Board
        board={board}
        setBoard={setBoard}
        setGameOver={setGameOver}
        gameEnd={gameEnd}
        curBlock={curBlock}
        fixedBlockCountRef={fixedBlockCountRef}
        setRowsFilled={setRowsFilled}
        intervalObj={intervalObj}
        genereteRandomShape={genereteRandomShape}
        boardRef={boardRef}
      />
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
