import { fillFixedRows, moveDown, moveLeft, moveRight } from '../util';

export const Board = ({
  board,
  setBoard,
  setGameOver,
  gameEnd,
  curBlock,
  fixedBlockCountRef,
  setRowsFilled,
  intervalObj,
  genereteRandomShape,
  boardRef,
}) => {
  const handleClick = () => {
    if (intervalObj.current || gameEnd) {
      if (gameEnd) {
        setGameOver(true);
      }
      return;
    }

    genereteRandomShape();
    let numFixedBlock = 0;
    intervalObj.current = setInterval(() => {
      moveDown(boardRef, curBlock.current, setBoard, fixedBlockCountRef); // Updates board via boardRef and setBoard

      if (numFixedBlock !== fixedBlockCountRef.current) {
        numFixedBlock = fixedBlockCountRef.current;
        fillFixedRows(boardRef, setRowsFilled, setBoard); // Use boardRef and update synchronously
        genereteRandomShape(); // Use boardRef and update synchronously
      }
    }, 1000);
  };

  const keyPress = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        moveLeft(boardRef, curBlock.current, setBoard, fixedBlockCountRef);
        break;
      case 'ArrowRight':
        moveRight(boardRef, curBlock.current, setBoard, fixedBlockCountRef);
        break;
      case 'ArrowDown':
        moveDown(boardRef, curBlock.current, setBoard, fixedBlockCountRef);
        break;
      default:
        break;
    }
  };

  return (
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
  );
};
