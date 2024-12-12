export const NumPicker = ({
  curCell,
  board,
  setBoard,
  sol,
  boardBg,
  setBoardBg,
}) => {
  const addNumber = (number) => {
    const newBoard = structuredClone(board);
    newBoard[curCell[0]][curCell[1]] = number;
    setBoard(newBoard);
    const newBoardBg = structuredClone(boardBg);

    console.log(sol[curCell[0]][curCell[1]]);

    if (
      sol[curCell[0]][curCell[1]] !==
      newBoard[curCell[0]][curCell[1]].toString()
    ) {
      const curBg = newBoardBg[curCell[0]][curCell[1]];
      if (!curBg.includes('text-red-500')) {
        newBoardBg[curCell[0]][curCell[1]] += ' text-red-500';
      }
    } else {
      newBoardBg[curCell[0]][curCell[1]] = newBoardBg[curCell[0]][
        curCell[1]
      ].replace(' text-red-500', '');
    }
    setBoardBg(newBoardBg);
  };
  return (
    <div className="mt-2 flex flex-row justify-evenly md:text-5xl sm:text-4xl text-2xl font-semibold">
      {Array.from(Array(9)).map((_, index) => {
        return (
          <button
            key={index}
            onClick={() => addNumber(index + 1)}
            className="hover:bg-gray-200 w-1/12 rounded-md hover:shadow-md md:h-14 sm:h-12 h-8"
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};
