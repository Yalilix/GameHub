export const DifficultyPicker = ({ setFn }) => {
  const levels = ['Easy', 'Medium', 'Hard', 'Expert'];
  return (
    <div className="flex flex-wrap gap-4 rounded-lg justify-center p-4">
      {levels.map((e, index) => {
        return (
          <button
            key={index}
            className="flex-1 min-w-[5rem] md:h-12 sm:h-10 h-8 bg-black text-white hover:bg-white hover:border hover:border-black hover:text-black font-semibold rounded-2xl md:text-lg sm:text-base text-xs shadow-2xl"
            onClick={() => setFn(e)}
          >
            {e}
          </button>
        );
      })}
    </div>
  );
};
