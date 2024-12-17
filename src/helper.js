export const shuffleArray = (array) => {
  let shuffled;
  do {
    shuffled = [...array]; // Copy the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
  } while (!isSolvable(shuffled.map((item) => item[0]))); // Repeat until solvable
  return shuffled;
};

// Helper function to count inversions and check solvability
const isSolvable = (array) => {
  let inversions = 0;
  const flatArray = array.filter((tile) => tile[0] !== ''); // Remove the blank tile
  for (let i = 0; i < flatArray.length; i++) {
    for (let j = i + 1; j < flatArray.length; j++) {
      if (flatArray[i] > flatArray[j]) inversions++;
    }
  }
  return inversions % 2 === 0; // Solvable if inversions are even
};
