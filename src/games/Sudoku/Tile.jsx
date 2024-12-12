export const Tile = ({ x, y, value, setCurCell, boardBg, setBoardBg }) => {
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

  const checkRedText = (x, y, boardBg) => {
    return boardBg[x][y].includes('text-red-500');
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
      }
    }
    for (let i = 0; i < 9; i++) {
      if (checkRedText(x, i, newBoardBg)) {
        newBoardBg[x][i] = 'bg-blue-100  text-red-500';
      } else {
        newBoardBg[x][i] = 'bg-blue-100';
      }
      if (checkRedText(i, y, newBoardBg)) {
        newBoardBg[i][y] = 'bg-blue-100 text-red-500';
      } else {
        newBoardBg[i][y] = 'bg-blue-100';
      }
    }
    for (let i = Math.floor(x / 3) * 3; i < Math.floor(x / 3) * 3 + 3; i++) {
      for (let j = Math.floor(y / 3) * 3; j < Math.floor(y / 3) * 3 + 3; j++) {
        if (checkRedText(i, j, newBoardBg)) {
          newBoardBg[i][j] = 'bg-blue-100 text-red-500';
        } else {
          newBoardBg[i][j] = 'bg-blue-100';
        }
      }
    }
    if (checkRedText(x, y, newBoardBg)) {
      newBoardBg[x][y] = 'bg-blue-300 text-red-500';
    } else {
      newBoardBg[x][y] = 'bg-blue-300';
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
      } ${value === '-' ? 'cursor-pointer hover:shadow-2xl' : ''}`}
      onClick={value !== '-' ? null : () => handleTileClick(x, y)}
    >
      {value === '-' ? '' : value}
    </div>
  );
};
