import { useEffect, useState } from 'react';
import './style.css';
import Page from '../../components/Page';
import { ResetButton } from '../../components/ResetButton';

const TicTacToe = () => {
  const defaultBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  const [board, setBoard] = useState(defaultBoard);
  const [turn, setTurn] = useState('X');
  const [winPlayer, setWinPlayer] = useState('');
  const [winTiles, setWinTiles] = useState([]);
  const [win, setWin] = useState(false);

  useEffect(() => {
    setTurn('X');
    setWinPlayer('');
    setWin(false);
    setWinTiles([]);
  }, [board]);

  const handleTurn = (x, y) => {
    if (board[y][x] === '' && !win) {
      let newBoard = board;
      newBoard[y][x] = turn;
      setTurn(turn === 'X' ? 'O' : 'X');
      setBoard(newBoard);
      checkWin();
    }
  };

  const checkWin = () => {
    const winLanes = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
    ];

    for (let lane of winLanes) {
      let [a, b, c] = lane;

      if (
        board[a[0]][a[1]] !== '' &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[b[0]][b[1]] === board[c[0]][c[1]]
      ) {
        setWinPlayer(turn === 'X' ? 'O' : 'X');
        setWinCount();
        setWin(true);
        setWinTiles([
          [a[0], a[1]],
          [b[0], b[1]],
          [c[0], c[1]],
        ]);
      }
    }
  };

  const setWinCount = () => {
    if (winPlayer === 'X') {
      let winCount = localStorage.getItem('winCount_X');
      localStorage.setItem('winCount_X', winCount ? parseInt(winCount) + 1 : 1);
    } else {
      let winCount = localStorage.getItem('winCount_O');
      localStorage.setItem('winCount_O', winCount ? parseInt(winCount) + 1 : 1);
    }
  };

  const setColour = (x, y) => {
    let win = false;
    winTiles.forEach((tile) => {
      if (tile[0] === y && tile[1] === x) {
        win = true;
      }
    });
    return win ? 'green text-white' : 'bg-white';
  };

  return (
    <>
      <Page>
        <div className=" flex justify-center items-center text-black flex-col rounded-md relative">
          <div className="absolute -top-20">
            {win && <div>{`Win player: ${turn === 'X' ? 'O' : 'X'}`}</div>}
          </div>
          <div className="bg-slate-500 md:p-4 sm:p-2 p-1 rounded-2xl">
            {board.map((row, y) => {
              return (
                <>
                  <div className="row rounded-md">
                    {row.map((value, x) => {
                      return (
                        <>
                          <button
                            className={`${setColour(
                              x,
                              y
                            )} md:w-40 md:h-32 sm:w-32 sm:h-24 w-14 h-16 rounded-xl md:m-2 m-1 shadow-md md:text-7xl sm:text-5xl`}
                            onClick={() => handleTurn(x, y)}
                          >
                            {value}
                          </button>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
          <ResetButton setFn={() => setBoard(defaultBoard)} />
        </div>
      </Page>
    </>
  );
};

export default TicTacToe;
