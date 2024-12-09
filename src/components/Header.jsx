import { useMediaQuery } from '@mui/material';
import { StyledHeader } from '../styles';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const isLargeScreen = useMediaQuery('(min-width:801px)');
  const navLinks = isLargeScreen
    ? ['Dashboard', 'Blanko', 'TicTacToe', '2048', 'WordColour']
    : ['D', 'B', 'T', '2048', 'WC'];

  const links = ['dashboard', 'blanko', 'tictactoe', '2048', 'wordcolour'];
  const navigate = useNavigate();
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
        <button
          className="text-2xl font-semibold h-20 fixed left-40 md:left-64 lg:left-1/2"
          onClick={() => navigate('/')}
        >
          Back Home
        </button>
        <nav className="fixed right-0 top-6 mr-2 text-xl">
          {navLinks.map((l, index) => (
            <>
              <Link key={index} to={`/${links[index]}`}>
                {l}
              </Link>
              {index !== links.length - 1 && ' | '}
            </>
          ))}
        </nav>
      </StyledHeader>
    </>
  );
};

export default Header;
