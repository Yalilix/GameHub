import Header from './Header';
import { StyledFooter } from '../styles';

const Page = ({ children }) => {
  return (
    <>
      <div className='m-0 flex flex-col min-h-screen'>
        <Header />
        <main className='pt-20 flex-grow flex justify-center items-center text-custom-2rem'>
          {children}
        </main>
        <StyledFooter />
      </div>
    </>
  );
};

export default Page;
