export const checkRedText = (x, y, boardBg) => {
  return boardBg[x][y].includes('text-red-500');
};

export const removeHighlightSameNumber = (i, j, newBoardBg) => {
  if (newBoardBg[i][j].includes('bg-blue-300')) {
    newBoardBg[i][j] = newBoardBg[i][j].replace('bg-blue-300', '');
  }
};

const checkRedTextPresence = (x, y, newBoardBg, board) => {
  for (let i = Math.floor(x / 3) * 3; i < Math.floor(x / 3) * 3 + 3; i++) {
    for (let j = Math.floor(y / 3) * 3; j < Math.floor(y / 3) * 3 + 3; j++) {
      if (checkRedText(i, j, newBoardBg) && board[i][j] === board[x][y])
        return true;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (
      (checkRedText(x, i, newBoardBg) && board[x][i] === board[x][y]) ||
      (checkRedText(i, y, newBoardBg) && board[i][y] === board[x][y])
    )
      return true;
  }

  return false;
};

const getOldBg = (x, y, newBoardBg) => {
  if (newBoardBg[x][y].includes('bg-blue-100')) {
    return 'bg-blue-100';
  } else if (newBoardBg[x][y].includes('bg-blue-300')) {
    return 'bg-blue-300';
  } else if (newBoardBg[x][y].includes('bg-red-100')) {
    return 'bg-red-100';
  } else if (newBoardBg[x][y].includes('bg-white')) {
    return 'bg-white';
  }
};

export const resetHighlight = (x, y, newBoardBg) => {
  for (let i = 0; i < 9; i++) {
    if (x === i || y === i) continue;
    const oldBgX = getOldBg(x, i, newBoardBg);
    const oldBgY = getOldBg(i, y, newBoardBg);

    newBoardBg[x][i] = newBoardBg[x][i].replace(oldBgX, 'bg-blue-100');
    newBoardBg[i][y] = newBoardBg[i][y].replace(oldBgY, 'bg-blue-100');
  }
  for (let i = Math.floor(x / 3) * 3; i < Math.floor(x / 3) * 3 + 3; i++) {
    for (let j = Math.floor(y / 3) * 3; j < Math.floor(y / 3) * 3 + 3; j++) {
      if (x === i && y === j) continue;
      const oldBg = getOldBg(i, j, newBoardBg);
      newBoardBg[i][j] = newBoardBg[i][j].replace(oldBg, 'bg-blue-100');
    }
  }
};

export const highlightSameNumber = (i, j, board, newBoardBg, curCell) => {
  if (i !== curCell[0] && j !== curCell[1])
    removeHighlightSameNumber(i, j, newBoardBg);
  if (board[i][j] === '-') return;

  if (board[i][j] === board[curCell[0]][curCell[1]]) {
    if (checkRedText(i, j, newBoardBg)) {
      newBoardBg[i][j] = newBoardBg[i][j].replace(
        'text-red-300',
        'bg-blue-300 text-red-300'
      );
    } else {
      newBoardBg[i][j] = 'bg-blue-300';
    }
    if (
      checkRedTextPresence(i, j, newBoardBg, board) &&
      !(i === curCell[0] && j === curCell[1])
    ) {
      if (newBoardBg[i][j].includes('bg-blue-300')) {
        newBoardBg[i][j] = newBoardBg[i][j].replace(
          'bg-blue-300',
          'bg-red-100'
        );
      } else {
        newBoardBg[i][j] = newBoardBg[i][j].replace(
          'bg-blue-100',
          'bg-red-100'
        );
      }
    }
  }
};
