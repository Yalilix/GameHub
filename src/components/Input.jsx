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
      type='text'
      value={input}
      maxLength={1}
      className='w-full pl-2 border border-black'
      onChange={handleInput}
    />
  );
};

export default Input;
