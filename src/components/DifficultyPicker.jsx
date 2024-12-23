export const DifficultyPicker = ({ setFn }) => {
  const levels = ['Easy', 'Medium', 'Hard', 'Expert'];
  return (
    <div className="mb-4 flex flex-wrap gap-4 rounded-lg md:h-14 sm:h-12 h-10 justify-center">
      {levels.map((e, index) => {
        return (
          <button
            key={index}
            className="flex-1 min-w-[5rem] bg-black text-white hover:bg-white hover:border hover:border-black hover:text-black font-semibold rounded-2xl md:text-xl sm:text-lg text-xs shadow-2xl"
            onClick={() => setFn(e)}
          >
            {e}
          </button>
        );
      })}
    </div>
  );
};
