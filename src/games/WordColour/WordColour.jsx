import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { StyledColorDiv } from '../styles';

const WordColour = () => {
  const [randColor, setRandColor] = useState('');
  const [colors, setColors] = useState([]);
  const [correct, setCorrect] = useState(0);

  const generateRandColor = () => {
    const strs = ['red', 'blue', 'orange', 'yellow', 'green', 'purple', 'pink'];
    return strs[Math.floor(Math.random() * strs.length)];
  };

  const getRandColors = (color) => {
    const colors = [color];
    for (let i = 0; i < 3; i++) {
      let newColor = '';
      while (true) {
        newColor = generateRandColor();
        if (!colors.includes(newColor)) {
          colors.push(newColor);
          break;
        }
      }
    }

    const randNum = Math.floor(Math.random() * 4);

    let temp = colors[0];
    colors[0] = colors[randNum];
    colors[randNum] = temp;
    return colors;
  };

  useEffect(() => {
    setTimeout(() => {
      const newColor = generateRandColor();
      setRandColor(newColor);
      setColors(getRandColors(newColor));
    }, 2000);
  }, []);

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
        setColors(getRandColors(newColor));
      }
    }
  };

  return (
    <>
      <Page>
        <div className='bg-wc1 h-1/2 w-screen flex justify-center items-center text-custom-2rem'>
          {randColor && <span>{randColor}</span>}
        </div>
        <div className='bg-wc2 h-1/2 w-screen flex flex-wrap'>
          {colors.map((e, index) => (
            <>
              <StyledColorDiv
                key={index}
                className={`w-1/2`}
                $bgcolor={e}
                onClick={() => handleClick(e)}
              ></StyledColorDiv>
            </>
          ))}
        </div>
      </Page>
    </>
  );
};

export default WordColour;
