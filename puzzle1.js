const fs = require("fs");

function readNumbersFromFile(filename) {
  const data = fs.readFileSync(filename, "utf8");
  return data
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function canConnect(a, b) {
  return a.slice(-2) === b.slice(0, 2);
}

function findLongestPath(currentPath, remainingNumbers) {
  let longestPath = currentPath;

  for (let i = 0; i < remainingNumbers.length; i++) {
    if (canConnect(currentPath[currentPath.length - 1], remainingNumbers[i])) {
      const newPath = findLongestPath(
        [...currentPath, remainingNumbers[i]],
        remainingNumbers.filter((_, index) => index !== i)
      );
      if (newPath.length > longestPath.length) {
        longestPath = newPath;
      }
    }
  }

  return longestPath;
}

function findLargestDigitalPuzzle(filename) {
  const numbers = readNumbersFromFile(filename);
  //   const numbers = ["608017", "248460", "962282", "994725", "177060"];
  let bestSequence = [];

  for (let i = 0; i < numbers.length; i++) {
    const sequence = findLongestPath(
      [numbers[i]],
      numbers.filter((_, index) => index !== i)
    );
    if (sequence.length > bestSequence.length) {
      bestSequence = sequence;
    }
  }

  let mergedSequence = bestSequence[0];
  for (let i = 1; i < bestSequence.length; i++) {
    mergedSequence = mergedSequence + bestSequence[i].slice(2);
  }

  console.log(mergedSequence);
}

const filename = "source.txt";
findLargestDigitalPuzzle(filename);
