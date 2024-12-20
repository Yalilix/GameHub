import Page from '../../components/Page';
import { getSudoku } from 'sudoku-gen';
import { useEffect, useState } from 'react';
import { NumPicker } from './NumPicker';
import { Tile } from './Tile';
import { highlightSameNumber, resetHighlight } from './helper';
import { DifficultyPicker } from '../../components/DifficultyPicker';

export const Sudoku = () => {
  const [board, setBoard] = useState([[], [], [], [], [], [], [], [], []]);
  const [boardBg, setBoardBg] = useState([[], [], [], [], [], [], [], [], []]);
  const [orginalBoard, setOrginalBoard] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const [curCell, setCurCell] = useState([-1, -1]);
  const [sol, setSol] = useState([[], [], [], [], [], [], [], [], []]);
  const [difficulty, setDifficulty] = useState('easy');

  useEffect(() => {
    const curBoard = [[], [], [], [], [], [], [], [], []];
    const curBoardBg = [[], [], [], [], [], [], [], [], []];
    const curSol = [[], [], [], [], [], [], [], [], []];
    const sudoku = getSudoku(difficulty.toLowerCase());

    sudoku.puzzle.split('').forEach((e, index) => {
      const curBoardLayer = Math.floor(index / 9);
      curBoard[curBoardLayer].push(e);
      curBoardBg[curBoardLayer].push('bg-white');
    });

    sudoku.solution.split('').forEach((e, index) => {
      const curBoardLayer = Math.floor(index / 9);
      curSol[curBoardLayer].push(e);
    });

    setBoard(curBoard);
    setOrginalBoard(curBoard);
    setBoardBg(curBoardBg);
    setCurCell([-1, -1]);
    setSol(curSol);
  }, [difficulty]);

  useEffect(() => {
    const curBoard = board.toString().replace(/,/g, '');
    const curSol = sol.toString().replace(/,/g, '');
    if (curCell[0] !== -1 || curCell[1] !== -1) {
      const newBoardBg = structuredClone(boardBg);
      resetHighlight(curCell[0], curCell[1], newBoardBg, curCell);
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          highlightSameNumber(i, j, board, newBoardBg, curCell);
        }
      }
      setBoardBg(newBoardBg);
    }
    if (curBoard === curSol && curBoard !== '') {
      setTimeout(() => alert('You win!'), 0);
    }
  }, [board]);

  return (
    <>
      <Page>
        <div className="w-full md:max-w-xl sm:max-w-[416px] max-w-[287px] flex flex-col">
          <DifficultyPicker setFn={setDifficulty} />
          <div className="flex">
            {board.map((row, x) => {
              return (
                <div key={x}>
                  {row.map((e, y) => {
                    return (
                      <Tile
                        key={y}
                        x={x}
                        y={y}
                        value={e}
                        setCurCell={setCurCell}
                        boardBg={boardBg}
                        setBoardBg={setBoardBg}
                        board={board}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          <NumPicker
            curCell={curCell}
            board={board}
            setBoard={setBoard}
            sol={sol}
            boardBg={boardBg}
            setBoardBg={setBoardBg}
            orginalBoard={orginalBoard}
          />
        </div>
      </Page>
    </>
  );
};
