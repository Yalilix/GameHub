import { useMediaQuery } from '@mui/material';
import { StyledHeader } from '../styles';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Link } from 'react-router-dom';

export const Header = () => {
  const isLargeScreen = useMediaQuery('(min-width:801px)');
  const navLinks = isLargeScreen
    ? ['Home', 'Blanko', 'TicTacToe', 'TwentyFourthyEight (2048)']
    : ['H', 'B', 'S', '2048'];

  const links = ['', 'blanko', 'tictactoe', '2048'];

  return (
    <>
      <StyledHeader>
        <AcUnitIcon
          sx={{
            margin: '15px',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '50px',
            height: '50px',
          }}
        />
        <nav className='fixed right-0 top-6 mr-2 text-xl'>
          {navLinks.map((l, index) => (
            <>
              <Link key={index} to={`/${links[index]}`}>
                {l}
              </Link>
              {index !== 3 && ' | '}
            </>
          ))}
        </nav>
      </StyledHeader>
    </>
  );
};

export default Header;
