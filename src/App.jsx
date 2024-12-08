import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TwentyFourthyEight from './games/2048/TwentyFourthyEight';
import Home from './Home';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/2048' element={<TwentyFourthyEight />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
