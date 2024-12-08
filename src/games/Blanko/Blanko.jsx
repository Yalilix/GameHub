import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Input from '../../components/Input';
import Page from '../../components/Page';

const Blanko = () => {
  const [inputs, setInputs] = useState(['', '', '']); // State for inputs
  const [randStr, setRandStr] = useState(''); // Static random string
  const [randNums, setRandNums] = useState([]); // Static random indices

  useEffect(() => {
    const generateRandStr = () => {
      const strs = [
        'the fat cats',
        'larger frogs',
        'banana cakes',
        'unsw vs usyd',
        'french toast',
        'hawaii pizza',
        'barack obama',
      ];
      return strs[Math.floor(Math.random() * strs.length)];
    };

    const getRandNums = (str) => {
      const nonValidNums = Array.from(str).reduce(
        (acc, char, index) => (char === ' ' ? [...acc, index] : acc),
        []
      );

      let randNums = [];
      while (randNums.length < 3) {
        const randNum = Math.floor(Math.random() * str.length);
        if (!randNums.includes(randNum) && !nonValidNums.includes(randNum)) {
          randNums.push(randNum);
        }
      }

      return randNums.sort((a, b) => a - b);
    };

    const str = generateRandStr();
    setRandStr(str);
    setRandNums(getRandNums(str));
  }, []); // Only runs once when the component mounts

  useEffect(() => {
    if (inputs.filter((e) => e !== '').length === 3) {
      const gameStr = Array.from(randStr).map((char, index) =>
        randNums.includes(index) ? '?' : char
      );

      inputs.forEach((e, i) => {
        if (e) {
          gameStr[randNums[i]] = e;
        }
      });

      if (randStr === gameStr.join('')) {
        alert('Correct!');
        window.location.reload();
      }
    }
  }, [inputs]);

  let x = 0;
  return (
    <>
      <Page>
        <div className='flex flex-col items-center'>
          <div className='flex flex-row mb-4'>
            {Array.from(randStr).map((char, index) => (
              <div
                key={index}
                className='border border-black mr-2 w-14 h-16 text-center p-2'
              >
                {randNums.includes(index) ? (
                  <Input index={x++} inputs={inputs} setInputs={setInputs} />
                ) : (
                  char
                )}
              </div>
            ))}
          </div>
          <Button onClick={() => window.location.reload()}>Reset</Button>
        </div>
      </Page>
    </>
  );
};

export default Blanko;
