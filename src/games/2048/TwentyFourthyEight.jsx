import { useEffect, useRef, useState } from 'react';
import './Game.css';
import Page from '../../components/Page';
import Modal from '../../components/Modal';

function TwentyFourthyEight() {
  const defaultBoard = [
    [2, 2, 2, 2],
    ['', 4, 2, ''],
    ['', '', '', ''],
    ['', 2, '', ''],
  ];

  const [board, setBoard] = useState(defaultBoard);
  const [fail, setFail] = useState(false);
  let moveAgain = false;
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [win, setWin] = useState(false);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const touch = e.touches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const dx = touchEnd.x - touchStart.x;
    const dy = touchEnd.y - touchStart.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        right();
        while (moveAgain) {
          moveAgain = false;
          right();
        }
      } else {
        left();
        while (moveAgain) {
          moveAgain = false;
          left();
        }
      }
    } else {
      if (dy > 0) {
        down();
        while (moveAgain) {
          moveAgain = false;
          down();
        }
      } else {
        up();
        while (moveAgain) {
          moveAgain = false;
          up();
        }
      }
    }
    addNewBlock();
    setTouchStart(null);
    setTouchEnd(null);
  };

  const up = () => {
    const newBoard = [...board];
    for (const col of newBoard) {
      for (let row = 0; row < 4; row++) {
        for (let x = row + 1; x < 4; x++) {
          if (col[row] === '') {
            if (col[x] !== '') {
              col[row] = col[x];
              col[x] = '';
              if (x + 1 < 4 && col[x + 1] !== '') {
                moveAgain = true;
              }
              break;
            }
          } else {
            if (col[x] === col[row] && row + 1 === x) {
              col[row] = col[row] + col[x];
              col[x] = '';
              break;
            }
          }
        }
      }
    }
    setBoard(newBoard);
  };

  const down = () => {
    const newBoard = [...board];
    for (const col of newBoard) {
      for (let row = 3; row >= 0; row--) {
        for (let x = row - 1; x >= 0; x--) {
          if (col[row] === '') {
            if (col[x] !== '') {
              col[row] = col[x];
              col[x] = '';
              if (x - 1 >= 0 && col[x - 1] !== '') {
                moveAgain = true;
              }
              break;
            }
          } else {
            if (col[x] === col[row] && row - 1 === x) {
              col[row] = col[row] + col[x];
              col[x] = '';
              break;
            }
          }
        }
      }
    }
    setBoard(newBoard);
  };

  const left = () => {
    const newBoard = [...board];
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 4; row++) {
        for (let col2 = col + 1; col2 < 4; col2++) {
          if (newBoard[col2][row] === '') continue;
          if (newBoard[col][row] === '') {
            newBoard[col][row] = newBoard[col2][row];
            newBoard[col2][row] = '';
            if (col2 + 1 < 4 && newBoard[col2 + 1][row] !== '') {
              moveAgain = true;
            }
            break;
          } else {
            if (
              newBoard[col][row] === newBoard[col2][row] &&
              col + 1 === col2
            ) {
              newBoard[col][row] = newBoard[col][row] + newBoard[col2][row];
              newBoard[col2][row] = '';
              break;
            }
          }
        }
      }
    }
    setBoard(newBoard);
  };

  const right = () => {
    const newBoard = [...board];
    for (let col = 3; col >= 0; col--) {
      for (let row = 0; row < 4; row++) {
        for (let col2 = col - 1; col2 >= 0; col2--) {
          if (newBoard[col2][row] === '') continue;
          if (newBoard[col][row] === '') {
            newBoard[col][row] = newBoard[col2][row];
            newBoard[col2][row] = '';
            if (col2 - 1 >= 0 && newBoard[col2 - 1][row] !== '') {
              moveAgain = true;
            }
            break;
          } else {
            if (
              newBoard[col][row] === newBoard[col2][row] &&
              col - 1 === col2
            ) {
              newBoard[col][row] = newBoard[col][row] + newBoard[col2][row];
              newBoard[col2][row] = '';
              break;
            }
          }
        }
      }
    }
    setBoard(newBoard);
  };

  const handleKeyPress = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        up();
        while (moveAgain) {
          moveAgain = false;
          up();
        }
        break;
      case 'ArrowDown':
        down();
        while (moveAgain) {
          moveAgain = false;
          down();
        }
        break;
      case 'ArrowLeft':
        left();
        while (moveAgain) {
          moveAgain = false;
          left();
        }
        break;
      case 'ArrowRight':
        right();
        while (moveAgain) {
          moveAgain = false;
          right();
        }
        break;
    }
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        addNewBlock();
        break;
    }
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.ceil(max));
  };

  const addNewBlock = () => {
    let newBoard = [...board];
    while (true) {
      const col = getRandomInt(15) % 4;
      const row = getRandomInt(15) % 4;
      if (board[col][row] === '') {
        newBoard[col][row] = getRandomInt(2) === 1 ? 2 : 4;
        break;
      }
      const amount = newBoard.reduce(
        (acc, curVal) => acc + curVal.filter((r) => r === '').length,
        0
      );
      if (amount === 0) {
        newBoard = checkFail();
        break;
      }
    }
    setBoard(newBoard);
  };

  const checkFail = () => {
    const oldBoard = board.map((row) => [...row]);
    up();
    down();
    left();
    right();

    const boardChanged = JSON.stringify(board) !== JSON.stringify(oldBoard);

    if (!boardChanged) {
      setFail(true);
    }
    return oldBoard;
  };

  const gameRef = useRef(null);

  useEffect(() => {
    // Automatically focus the div on mount
    if (gameRef.current) {
      gameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    board.forEach((col) => {
      col.forEach((row) => {
        if (row === 2048) {
          setWin(true);
        }
      });
    });
  }, [board]);

  return (
    <>
      <Page>
        {fail && <Modal setFail={setFail} text={'Game Over'} />}
        {win && <Modal setFail={setWin} text={'Game Won'} />}
        <div
          ref={gameRef}
          onKeyDown={handleKeyPress}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          tabIndex={0}
        >
          <div className="parent">
            {board.map((col, y) => {
              return (
                <div key={y} className="flex-col">
                  {col.map((row, x) => {
                    return (
                      <div key={x} className="block" data-value={row}>
                        {row}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </Page>
    </>
  );
}

export default TwentyFourthyEight;
