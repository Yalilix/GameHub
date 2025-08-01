import { useState } from 'react';

const Input = ({ index, inputs, setInputs }) => {
  const [input, setInput] = useState('');

  const handleInput = (e) => {
    const newValue = e.target.value;

    // Update local input state immediately for UI responsiveness
    setInput(newValue);

    // Update the parent inputs array
    const updatedInputs = [...inputs];
    updatedInputs[index] = newValue;
    setTimeout(() => {
      setInputs(updatedInputs);
    }, 300);
  };

  return (
    <input
      type="text"
      value={input}
      maxLength={1}
      className="w-full md:pl-2 border border-black md:text-md mb-2 h-full"
      onChange={handleInput}
    />
  );
};

export default Input;
