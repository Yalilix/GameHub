import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { StyledColorDiv } from '../../styles';
import ColorName from 'color-name';
import { DifficultyPicker } from '../../components/DifficultyPicker';
import './style.css';

let timeObj = null;

const WordColour = () => {
  const [randColor, setRandColor] = useState('');
  const [colors, setColors] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const [boardSize, setBoardSize] = useState(4);

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
      alert('You have won');
      window.location.reload();
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
        <div className="flex flex-col">
          <DifficultyPicker setFn={setDifficulty} />
          <div className="flex w-screen items-center">
            <div className="bg-wc1 w-1/2 flex justify-center items-center md:text-custom-2rem sm:text-2xl text-xl md:h-96 sm:h-80 h-60 break-normal">
              {randColor ? (
                <span>{randColor}</span>
              ) : (
                <span className="">Loading...</span>
              )}
            </div>
            <div className="bg-wc2 w-1/2 md:h-96 sm:h-80 h-60 flex">
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
