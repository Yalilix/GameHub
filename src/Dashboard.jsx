import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

const DashBoard = () => {
  const [winCount, setWinCount] = useState(
    localStorage.getItem('win_count') ? localStorage.getItem('win_count') : 0
  );

  const [initialState, setInitialState] = useState(false);
  useEffect(() => {
    getData();
  }, [initialState]);

  const getData = async () => {
    const res = await fetch(
      `https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json`
    );
    const data = await res.json();
    setWinCount(data.score);
    setInitialState(false);
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <span className='text-red-500 text-custom-2em'>
          Please choose an option from the navbar.
        </span>
        <div>
          <span className='text-xl'>Games won: {winCount}</span>
          <Button sx={{ color: 'black' }} onClick={() => setInitialState(true)}>
            (reset)
          </Button>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
