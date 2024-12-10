import { StyledHeader } from '../styles';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <StyledHeader className="flex justify-evenly items-center">
        <AcUnitIcon
          sx={{
            margin: '15px',
            width: '50px',
            height: '50px',
          }}
        />
        <button
          className="text-2xl font-semibold mr-4 h-12  rounded-lg hover:bg-darkBlue hover:text-white duration-300"
          onClick={() => navigate('/')}
        >
          Main Menu
        </button>
      </StyledHeader>
    </>
  );
};

export default Header;
