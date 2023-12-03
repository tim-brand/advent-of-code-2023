// DAY: 03

const parseInput = (input: string): string[] => {
  return input
    .split("\n")
    .map((line) => line.trim())
    .map((line) => line.replaceAll(".", "X"))
    .filter((line) => line.length > 0);
};

const findSymbols = (lines: string[]) => {
  return lines.reduce(
    (acc, line, i) => {
      const symbolsOnLine = line.matchAll(/(\W{1})/g);
      for (const symbol of symbolsOnLine) {
        acc.push({ symbol: symbol[0], x: i, y: symbol.index! });
      }
      return acc;
    },
    [] as { symbol: string; x: number; y: number }[],
  );
};

const findParts = (lines: string[]) => {
  return lines.reduce(
    (acc, line, i) => {
      const partNumbers = line.matchAll(/(\d+)/g);
      for (const partNumber of partNumbers) {
        acc.push({
          partNumber: Number(partNumber[0]),
          x: i,
          y: partNumber.index!,
          length: partNumber[0].length,
        });
      }
      return acc;
    },
    [] as { partNumber: number; x: number; y: number; length: number }[],
  );
};

export const part1 = (input: string): number => {
  let result = 0;
  const lines = parseInput(input);
  const symbols = findSymbols(lines);
  const parts = findParts(lines);

  for (const part of parts) {
    const isPartAdjacentToSymbol = symbols.some(
      ({ x, y }) =>
        (x === part.x - 1 && y >= part.y - 1 && y <= part.y + part.length) ||
        (x === part.x && (y === part.y - 1 || y === part.y + part.length)) ||
        (x === part.x + 1 && y >= part.y - 1 && y <= part.y + part.length),
    );
    result += isPartAdjacentToSymbol ? part.partNumber : 0;
  }

  return result;
};

export const part2 = (input: string): number => {
  let result = 0;
  const lines = parseInput(input);
  const symbols = findSymbols(lines);
  const parts = findParts(lines);

  for (const symbol of symbols) {
    const adjacentParts = parts.filter(
      ({ x, y, length }) =>
        (x === symbol.x - 1 && symbol.y >= y - 1 && symbol.y <= y + length) ||
        (x === symbol.x && (symbol.y === y - 1 || symbol.y === y + length)) ||
        (x === symbol.x + 1 && symbol.y >= y - 1 && symbol.y <= y + length),
    );
    if (adjacentParts.length === 2) {
      result += adjacentParts[0].partNumber * adjacentParts[1].partNumber;
    }
  }

  return result;
};
