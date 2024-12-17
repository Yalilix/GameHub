import { Button } from '@mui/material';

export const ResetButton = ({ setFn, generateGame = null }) => {
  return (
    <Button
      sx={{ paddingTop: '10px', height: '40px', marginTop: '20px' }}
      onClick={() => (generateGame === null ? setFn() : setFn(generateGame()))}
      variant="contained"
      className="self-center"
    >
      reset
    </Button>
  );
};
