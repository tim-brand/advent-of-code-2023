// DAY: 04

const parseInput = (input: string): string[] => {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
};

const getCardId = (line: string): number =>
  Number(/Card\s+(\d+):/gi.exec(line)![1]);
const getWinningNyumbers = (line: string): number[] =>
  /:([\s+\d+]+)/gi.exec(line)![1].split(/\s+/).filter(Boolean).map(Number);
const getMyNumbers = (line: string): number[] =>
  /\|([\s+\d+]+)/gi.exec(line)![1].split(/\s+/).filter(Boolean).map(Number);

export const part1 = (input: string): number => {
  let result = 0;
  parseInput(input).forEach((line, i) => {
    const winningNumbers = getWinningNyumbers(line);
    const myNumbers = getMyNumbers(line);

    let cartPrice = 0;
    winningNumbers.forEach((winningNumber) => {
      if (!myNumbers.includes(winningNumber)) return;
      cartPrice = cartPrice ? cartPrice * 2 : 1;
    });
    result += cartPrice;
  });
  return result;
};

export const part2 = (input: string): number => {
  // eslint-disable-next-line prefer-const
  let result = 0;
  const lines = parseInput(input);
  const cardMultipliers: Record<string, number> = {};
  lines.forEach((line) => {
    const cardId = getCardId(line);
    cardMultipliers[cardId] = 1;
  });
  lines.forEach((line, i) => {
    const cardId = getCardId(line);
    const winningNumbers = getWinningNyumbers(line);
    const myNumbers = getMyNumbers(line);

    for (let i = 0; i < cardMultipliers[cardId]; i++) {
      const matchingNumbers = winningNumbers.filter((winningNumber) =>
        myNumbers.includes(winningNumber),
      );
      for (let i = 1; i <= matchingNumbers.length; i++) {
        const nextCardId = cardId + i;
        cardMultipliers[nextCardId] = cardMultipliers[nextCardId] + 1;
      }
      result += 1;
    }
  });

  return result;
};
