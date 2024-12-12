import Page from '../../components/Page';
import { getSudoku } from 'sudoku-gen';
import { useEffect, useState } from 'react';
import { NumPicker } from './NumPicker';
import { Tile } from './Tile';

export const Sudoku = () => {
  const [board, setBoard] = useState([[], [], [], [], [], [], [], [], []]);
  const [boardBg, setBoardBg] = useState([[], [], [], [], [], [], [], [], []]);
  const [curCell, setCurCell] = useState([0, 0]);
  const [sol, setSol] = useState([[], [], [], [], [], [], [], [], []]);

  useEffect(() => {
    const curBoard = [[], [], [], [], [], [], [], [], []];
    const curBoardBg = [[], [], [], [], [], [], [], [], []];
    const curSol = [[], [], [], [], [], [], [], [], []];

    const sudoku = getSudoku('easy');

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
    setBoardBg(curBoardBg);
    setSol(curSol);
  }, []);

  useEffect(() => {
    const curBoard = board.toString().replace(/,/g, '');
    const curSol = sol.toString().replace(/,/g, '');
    if (curBoard === curSol && curBoard !== '') {
      setTimeout(() => alert('You win!'), 0);
    }
  }, [board]);

  return (
    <>
      <Page>
        <div className="w-full md:max-w-xl sm:max-w-[416px] max-w-[287px] flex flex-col">
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
          />
        </div>
      </Page>
    </>
  );
};
