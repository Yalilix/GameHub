export const ActionButton = ({ onClick, text, color }) => {
  return (
    <button
      className={`text-2xl font-bold text-center text-black bg-black rounded-full shadow-2xl size-8 ${color}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
