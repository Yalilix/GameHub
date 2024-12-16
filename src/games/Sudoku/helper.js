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
