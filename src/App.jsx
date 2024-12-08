import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TwentyFourthyEight from './games/2048/TwentyFourthyEight';
import Home from './Home';
import Blanko from './games/Blanko/Blanko';
import TicTacToe from './games/tictactoe/TicTacToe';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/2048' element={<TwentyFourthyEight />} />
          <Route path='/blanko' element={<Blanko />} />
          <Route path='/tictactoe' element={<TicTacToe />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
