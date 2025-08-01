import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { StyledColorDiv } from '../../styles';
import ColorName from 'color-name';
import { DifficultyPicker } from '../../components/DifficultyPicker';
import './style.css';
import Modal from '../../components/Modal';

let timeObj = null;

const WordColour = () => {
  const [randColor, setRandColor] = useState('');
  const [colors, setColors] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [boardSize, setBoardSize] = useState(4);
  const [gameWon, setGameWon] = useState(false);

  const generateRandColor = () => {
    const strs = Object.keys(ColorName);
    // const strs = ['red', 'blue', 'orange', 'yellow', 'green', 'purple', 'pink'];
    return strs[Math.floor(Math.random() * strs.length)];
  };

  const getRandColors = (color, size) => {
    const colors = [color];
    for (let i = 0; i < size - 1; i++) {
      let newColor = '';
      while (true) {
        newColor = generateRandColor();
        if (!colors.includes(newColor)) {
          colors.push(newColor);
          break;
        }
      }
    }

    const randNum = Math.floor(Math.random() * size);

    let temp = colors[0];
    colors[0] = colors[randNum];
    colors[randNum] = temp;
    return colors;
  };

  useEffect(() => {
    clearTimeout(timeObj);
    setRandColor('');
    setColors([]);
    const levels = ['easy', 'medium', 'hard', 'expert'];
    const newSize = (levels.indexOf(difficulty.toLowerCase()) + 2) ** 2;
    setBoardSize(newSize);
    timeObj = setTimeout(() => {
      const newColor = generateRandColor();
      setRandColor(newColor);
      setColors(getRandColors(newColor, newSize));
    }, 2000);
  }, [difficulty]);

  useEffect(() => {
    if (correct === 3) {
      setGameWon(true);
    }
  }, [correct]);

  const handleClick = (color) => {
    if (color === randColor) {
      const newCor = correct + 1;
      setCorrect(newCor);
      if (newCor !== 3) {
        const newColor = generateRandColor();
        setRandColor(newColor);
        const levels = ['easy', 'medium', 'hard', 'expert'];
        const newSize = (levels.indexOf(difficulty.toLowerCase()) + 2) ** 2;
        setBoardSize(newSize);
        setColors(getRandColors(newColor, newSize));
      }
    }
  };

  return (
    <>
      <Page>
        {gameWon && (
          <Modal
            setFail={() => {
              setGameWon(false);
            }}
            text={'Game Won'}
          />
        )}
        <div className="flex flex-col">
          <DifficultyPicker setFn={setDifficulty} />
          <div className="flex items-center w-screen">
            <div className="flex items-center justify-center w-1/2 text-xl break-normal bg-wc1 md:text-custom-2rem sm:text-2xl md:h-96 sm:h-80 h-60">
              {randColor ? (
                <span>{randColor}</span>
              ) : (
                <span className="">Loading...</span>
              )}
            </div>
            <div className="flex w-1/2 bg-wc2 md:h-96 sm:h-80 h-60">
              <div className="board" data-size={boardSize}>
                {colors.map((e, index) => (
                  <StyledColorDiv
                    key={index}
                    $bgcolor={e}
                    onClick={() => handleClick(e)}
                  ></StyledColorDiv>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
};

export default WordColour;
