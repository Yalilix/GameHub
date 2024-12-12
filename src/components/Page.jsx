import Header from './Header';
import { StyledFooter } from '../styles';

const Page = ({ children }) => {
  return (
    <>
      <div className="m-0 flex flex-col min-h-screen">
        <div>
          <Header />
        </div>
        <main className=" flex-grow flex justify-center items-center text-custom-2rem overflow-hidden">
          {children}
        </main>
        <StyledFooter />
      </div>
    </>
  );
};

export default Page;
