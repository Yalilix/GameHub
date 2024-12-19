import { StyledHeader } from '../styles';
import { useNavigate } from 'react-router-dom';
import GameIcon from '../../public/game.svg';

export const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <StyledHeader className="flex justify-evenly items-center bg-deepNavy text-white border-b border-gray-700">
        <img src={GameIcon} alt="Game Icon" className="ml-4 md:h-10 h-8" />
        <button
          className="text-2xl font-semibold mr-4 h-12 rounded-lg hover:bg-darkBlue hover:text-white duration-300"
          onClick={() => navigate('/')}
        >
          Main Menu
        </button>
      </StyledHeader>
    </>
  );
};

export default Header;
