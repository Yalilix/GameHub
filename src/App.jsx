import { HashRouter, Routes, Route } from 'react-router-dom';
import TwentyFourthyEight from './games/2048/TwentyFourthyEight';
import Home from './CommonPages/Home';
import Blanko from './games/Blanko/Blanko';
import TicTacToe from './games/Tictactoe/TicTacToe';
import DashBoard from './CommonPages/Dashboard';
import WordColour from './games/WordColour/WordColour';
import { Sudoku } from './games/Sudoku/Sudoku';
import { Slido } from './games/Slido/Slido';
import { Tetro } from './games/Tetro/Tetro';

const App = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/2048" element={<TwentyFourthyEight />} />
          <Route path="/blanko" element={<Blanko />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/wordcolour" element={<WordColour />} />
          <Route path="/sudoku" element={<Sudoku />} />
          <Route path="/slido" element={<Slido />} />
          <Route path="/tetro" element={<Tetro />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
