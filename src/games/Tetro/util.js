export const getDefaultBoard = () => {
  const createCell = () => ({ value: 0, fix: false, color: 'bg-black' });
  return Array.from({ length: 20 }, () =>
    Array.from({ length: 10 }, () => createCell())
  );
};

export const getRules = (difficulty) => {
  const rules = ['Easy', 'Medium', 'Hard', 'Expert'];

  return (rules.indexOf(difficulty) + 1) * 2;
};

export const updateBoard = (boardRef, newBoard, setBoard) => {
  boardRef.current = newBoard; // Update the ref
  setBoard(newBoard); // Update React state
};

export const adjustBoard = (
  curBlocks,
  newBoard,
  i,
  j,
  x,
  y,
  length,
  countRef
) => {
  let condition = true;
  curBlocks.blocks.forEach(({ i: bi, j: bj }) => {
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

  if (condition && !curBlocks.fix) {
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
    curBlocks.fix = true;
    countRef.current += 1;
    return { i, j };
  }
};

export const moveLeft = (boardRef, curBlocks, setBoard, countRef) => {
  const curBoard = boardRef.current;
  const newBoard = structuredClone(curBoard);
  const updatedBlocks = curBlocks.blocks.map(({ i, j }) => {
    return adjustBoard(
      curBlocks,
      newBoard,
      i,
      j,
      i,
      j - 1,
      newBoard[0].length,
      countRef
    );
  });

  curBlocks.blocks = updatedBlocks;
  updateBoard(boardRef, newBoard, setBoard);
};

export const moveRight = (boardRef, curBlocks, setBoard, countRef) => {
  const curBoard = boardRef.current;
  const newBoard = structuredClone(curBoard);
  const updatedBlocks = curBlocks.blocks
    .slice()
    .reverse()
    .map(({ i, j }) => {
      return adjustBoard(
        curBlocks,
        newBoard,
        i,
        j,
        i,
        j + 1,
        newBoard[0].length,
        countRef
      );
    });

  curBlocks.blocks = updatedBlocks.reverse();
  updateBoard(boardRef, newBoard, setBoard);
};

export const moveDown = (boardRef, curBlocks, setBoard, countRef) => {
  const curBoard = boardRef.current;
  const newBoard = structuredClone(curBoard);
  const updatedBlocks = curBlocks.blocks.map(({ i, j }) => {
    return adjustBoard(
      curBlocks,
      newBoard,
      i,
      j,
      i + 1,
      j,
      newBoard.length,
      countRef
    );
  });

  curBlocks.blocks = updatedBlocks;
  updateBoard(boardRef, newBoard, setBoard);
};

export const endGame = (intervalObj, setGameOver, setGameEnd) => {
  clearInterval(intervalObj);
  intervalObj = null;
  setGameOver(true);
  setGameEnd(true);
};

export const isRowFilled = (curBoard, row) => {
  return curBoard[row].every(
    (cell) => cell.value === 1 && cell.color !== 'color-finished'
  );
};

const changeRowGreen = (boardRef, setBoard, row) => {
  const curBoard = boardRef.current;
  const newBoard = structuredClone(curBoard);
  newBoard[row].forEach((cell) => {
    cell.color = 'color-finished';
  });
  updateBoard(boardRef, newBoard, setBoard);
};

export const fillFixedRows = (boardRef, setRowsFilled, setBoard) => {
  const curBoard = boardRef.current;
  setRowsFilled((prevRowsFilled) => {
    let filledRows = prevRowsFilled;
    for (let i = 0; i < curBoard.length; i++) {
      if (isRowFilled(curBoard, i)) {
        changeRowGreen(boardRef, setBoard, i);
        filledRows += 1;
        // newBoard.splice(i, 1);
        // newBoard.unshift(Array.from({ length: 10 }, () => createCell()));
      }
    }
    return filledRows;
  });
};
