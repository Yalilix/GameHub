import { DifficultyPicker } from '../../../components/DifficultyPicker';
import Modal from '../../../components/Modal';

export const StartModal = ({ setDifficulty }) => {
  return (
    <Modal setFail={null} text={'Select Difficulty'}>
      <DifficultyPicker setFn={setDifficulty} />
      <button
        className="w-24 h-10 gap-2 text-xs font-semibold text-white bg-red-500 shadow-2xl hover:bg-red-700 hover:border rounded-2xl md:text-2xl sm:text-lg"
        onClick={() => setDifficulty('Easy')}
      >
        CLOSE
      </button>
    </Modal>
  );
};
