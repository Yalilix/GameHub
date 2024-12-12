import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Input from '../../components/Input';
import Page from '../../components/Page';
import { generate } from 'random-words';

const Blanko = () => {
  const [inputs, setInputs] = useState(['', '', '']); // State for inputs
  const [randStr, setRandStr] = useState(''); // Static random string
  const [randNums, setRandNums] = useState([]); // Static random indices

  const getNumLetters = (number) => {
    return Math.max(2, Math.floor(Math.random() * number));
  };

  useEffect(() => {
    const generateRandStr = () => {
      const firstStr = getNumLetters(13);

      const strs = generate({
        exactly: 1,
        minLength: firstStr,
        maxLength: firstStr,
      });

      let remainLetters = 11 - firstStr;

      while (remainLetters > 0) {
        let currentStr = 0;
        while (true) {
          currentStr = getNumLetters(remainLetters);
          const remains = remainLetters - (currentStr + 1);
          if (remains === 1) {
            continue;
          }
          break;
        }
        const str = generate({
          minLength: currentStr,
          maxLength: currentStr,
        });

        if (!strs.includes(str)) {
          strs.push(str);
        }
        remainLetters -= currentStr + 1;
      }

      console.log(strs);
      return strs.length > 1 ? strs.join(' ') : strs[0];
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
        <div className="flex flex-col items-center">
          <div className="flex flex-row mb-4 flex-wrap justify-center">
            {Array.from(randStr).map((char, index) => (
              <div
                key={index}
                className="border border-black w-10 md:w-14 md:h-16 text-center p-2 m-2"
              >
                {randNums.includes(index) ? (
                  <Input index={x++} inputs={inputs} setInputs={setInputs} />
                ) : (
                  char
                )}
              </div>
            ))}
          </div>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ paddingTop: '10px', height: '50px' }}
          >
            Reset
          </Button>
        </div>
      </Page>
    </>
  );
};

export default Blanko;
