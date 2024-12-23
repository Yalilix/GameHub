export const ActionButton = ({ onClick, text }) => {
  return (
    <button
      className="bg-black text-white hover:bg-white hover:border hover:border-black hover:text-black w-fit p-2 font-semibold rounded-2xl gap-2 md:text-2xl sm:text-lg text-xs shadow-2xl h-10"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
