import { useEffect, useState } from 'react';

const Modal = ({ setFail, text, children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start the "show" animation immediately after mounting
    const timer = setTimeout(() => {
      setVisible(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    // Start the "hide" animation
    setVisible(false);
    setTimeout(() => {
      setFail(false); // After animation ends, remove modal
    }, 1000); // Match the duration-1000 class
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-1000 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-deepNavy text-white p-8 rounded-2xl transition-transform duration-1000 flex-col flex items-center gap-4 ${
          visible ? 'scale-100' : 'scale-0'
        }`}
      >
        <span className="font-semibold text-4xl uppercase">{text}</span>
        {children}
        {setFail && (
          <button
            onClick={closeModal}
            className="mt-4 bg-red-500 px-4 py-2 rounded w-1/2 self-center hover:bg-red-600 h-10 text-lg"
          >
            Close
          </button>
        )}
        {/* <button
          onClick={setFail !== null ? closeModal : () => {}}
          className="mt-4 bg-red-500 px-4 py-2 rounded w-1/2 self-center hover:bg-red-600 h-10 text-lg"
        >
          Close
        </button> */}
      </div>
    </div>
  );
};

export default Modal;
