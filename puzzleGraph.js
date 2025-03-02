const { log } = require("console");
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

function createGraph(data) {
  const graph = new Map();
  for (let i = 0; i < data.length; i++) {
    let values = [];
    data.forEach((element, index) => {
      if (i != index && canConnect(data[i], element)) {
        values.push(element);
      }
    });
    graph.set(data[i], values);
    // console.log(`Key:${data[i]} Values: ${values}`);
  }
  //   console.log(graph.size);

  return graph;
}

function findLongestPath(currentPath, remainingNumbers) {
  //   console.log(remainingNumbers);

  let longestPath = currentPath;
  const currentNumber = currentPath[currentPath.length - 1];
  //   console.log(currentNumber);

  const currentValues = remainingNumbers.get(currentNumber);
  //   console.log(currentValues);
  const graphCopy = new Map(remainingNumbers);
  graphCopy.delete(currentNumber);
  if (currentValues) {
    for (let i = 0; i < currentValues.length; i++) {
      if (!currentPath.includes(currentValues[i])) {
        const newPath = findLongestPath(
          [...currentPath, currentValues[i]],
          graphCopy
        );
        if (newPath.length > longestPath.length) {
          longestPath = newPath;
        }
      }
    }
  }

  return longestPath;
}

function findLargestDigitalPuzzle(filename) {
  const numbers = readNumbersFromFile(filename);
  //   const numbers = ["608017", "248460", "962282", "994725", "177060"];
  const graph = createGraph(numbers);
  let bestSequence = [];

  for (let i = 0; i < numbers.length; i++) {
    // console.log(numbers[i]);
    const sequence = findLongestPath([numbers[i]], graph);
    // console.log(sequence);

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
