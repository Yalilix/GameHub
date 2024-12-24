import { useMediaQuery } from '@mui/material';
import { getRules, moveDown, moveLeft, moveRight } from '../util';
import { ActionButton } from '../../../components/ActionButton';

export const SidePanel = ({
  difficulty,
  setDifficulty,
  rowsFilled,
  boardRef,
  curBlocks,
  setBoard,
  countRef,
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div className="flex flex-col items-center justify-around w-2/5 pt-8 pl-1 pr-1 ml-6 border border-black tetro-view rounded-3xl">
      <span className="text-2xl font-semibold text-center sm:text-3xl">
        Get {difficulty === null ? '?' : getRules(difficulty)} rows filled to
        win
      </span>
      <span className="mt-12 text-base text-center sm:text-xl">
        Rows filled: {rowsFilled}
      </span>
      <button
        className="h-8 gap-2 p-2 text-xs font-semibold text-white bg-black shadow-2xl sm:h-10 md:h-12 hover:bg-white hover:border hover:border-black hover:text-black w-fit rounded-2xl md:text-2xl sm:text-lg"
        onClick={() => setDifficulty(null)}
      >
        Restart
      </button>
      {isMobile ? (
        <div className="flex flex-wrap justify-center gap-1 p-2 border border-gray-500 rounded-full shadow-xl bg-deepNavy">
          <ActionButton
            onClick={() => moveLeft(boardRef, curBlocks, setBoard, countRef)}
            text="←"
            color={'bg-red-500'}
          />
          <ActionButton
            onClick={() => moveRight(boardRef, curBlocks, setBoard, countRef)}
            text="→"
            color={'bg-blue-500'}
          />
          <ActionButton
            onClick={() => moveDown(boardRef, curBlocks, setBoard, countRef)}
            text="↓"
            color={'bg-green-500'}
          />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-1 ml-2 mr-2 text-lg text-center">
          <span>Press LEFT, RIGHT or DOWN arrow keys to play</span>
        </div>
      )}
    </div>
  );
};
