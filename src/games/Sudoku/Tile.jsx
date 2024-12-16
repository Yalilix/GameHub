import { checkRedText, highlightSameNumber } from './helper';

export const Tile = ({
  x,
  y,
  value,
  setCurCell,
  boardBg,
  setBoardBg,
  board,
}) => {
  const setBorders = (x, y) => {
    const borders = [];
    if (x % 3 === 0) {
      borders.push('border-l-black');
    } else {
      borders.push('border-l-gray-300');
    }

    if (y % 3 === 0) {
      borders.push('border-t-black');
    } else {
      borders.push('border-t-gray-300');
    }

    if (x % 3 === 2) {
      borders.push('border-r-black');
    } else {
      borders.push('border-r-gray-300');
    }

    if (y % 3 === 2) {
      borders.push('border-b-black');
    } else {
      borders.push('border-b-gray-300');
    }

    return borders.join(' ');
  };

  const newSameNumber = (x, y, newBoardBg) => {
    if (value === board[x][y] && value !== '-') {
      newBoardBg[x][y] = newBoardBg[x][y].replace('bg-blue-100', 'bg-blue-300');
    }
    if (checkRedText(x, y, newBoardBg)) {
      newBoardBg[x][y] = newBoardBg[x][y].replace('bg-blue-300', 'bg-red-100');
    }
  };

  const handleTileClick = (x, y) => {
    const newBoardBg = structuredClone(boardBg);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (checkRedText(i, j, newBoardBg)) {
          newBoardBg[i][j] = 'bg-white text-red-500';
        } else {
          newBoardBg[i][j] = 'bg-white';
        }
        highlightSameNumber(i, j, board, newBoardBg, [x, y]);
      }
    }
    for (let i = 0; i < 9; i++) {
      newBoardBg[x][i] = newBoardBg[x][i].replace('bg-white', 'bg-blue-100');
      newBoardBg[i][y] = newBoardBg[i][y].replace('bg-white', 'bg-blue-100');
      newSameNumber(x, i, newBoardBg);
      newSameNumber(i, y, newBoardBg);
    }
    for (let i = Math.floor(x / 3) * 3; i < Math.floor(x / 3) * 3 + 3; i++) {
      for (let j = Math.floor(y / 3) * 3; j < Math.floor(y / 3) * 3 + 3; j++) {
        newBoardBg[i][j] = newBoardBg[i][j].replace('bg-white', 'bg-blue-100');
        newSameNumber(i, j, newBoardBg);
      }
    }
    if (checkRedText(x, y, newBoardBg)) {
      newBoardBg[x][y] = newBoardBg[x][y].replace('bg-red-100', 'bg-blue-300');
    } else {
      newBoardBg[x][y] = newBoardBg[x][y].replace('bg-blue-100', 'bg-blue-300');
    }

    setCurCell([x, y]);
    setBoardBg(newBoardBg);
  };

  return (
    <div
      key={y}
      className={`${setBorders(
        x,
        y
      )} flex justify-center items-center border md:w-16 md:h-16 sm:w-12 sm:h-12 w-8 h-8 md:text-5xl sm:text-4xl text-2xl ${
        boardBg[x][y]
      } cursor-pointer hover:shadow-2xl`}
      onClick={() => handleTileClick(x, y)}
    >
      {value === '-' ? '' : value}
    </div>
  );
};
