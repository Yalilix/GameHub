import { useState } from 'react';
import './style.css';
import { Button } from '@mui/material';
import Page from '../../components/Page';

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
        console.log([
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
    return win ? 'green' : '';
  };

  return (
    <>
      <Page>
        <div className=" flex justify-center items-center h-fit text-black flex-col rounded-md">
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
                          )} border border-black w-40 h-32 rounded-xl`}
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
          {win && <div>{`Win player: ${turn === 'X' ? 'O' : 'X'}`}</div>}
          <Button sx={{ paddingTop: '10px', height: '50px' }}>reset</Button>
        </div>
      </Page>
    </>
  );
};

export default TicTacToe;
