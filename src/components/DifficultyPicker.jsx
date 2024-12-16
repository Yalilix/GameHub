export const DifficultyPicker = ({ setFn }) => {
  const levels = ['Easy', 'Medium', 'Hard', 'Expert'];
  return (
    <div className="mb-4 flex justify-evenly rounded-lg md:h-12 sm:h-10 h-8">
      {levels.map((e, index) => {
        return (
          <button
            key={index}
            className=" bg-black text-white hover:bg-white hover:border hover:border-black hover:text-black w-1/5 font-semibold rounded-2xl gap-2 md:text-2xl sm:text-lg text-xs shadow-2xl"
            onClick={() => setFn(e)}
          >
            {e}
          </button>
        );
      })}
    </div>
  );
};
