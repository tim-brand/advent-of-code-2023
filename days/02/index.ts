// DAY: 02

const parseInput = (input: string): string[] => {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
};

export const part1 = (input: string): number => {
  let result = 0;
  parseInput(input).forEach((line) => {
    const matchId = parseInt(line.match(/Game (\d+):/i)?.[1] ?? "-1");
    const cubeShows = line.split(";");
    const bagLimits: Record<string, number> = {
      red: 12,
      green: 13,
      blue: 14,
    };
    let bagIsValid = true;
    for (const cubeShow of cubeShows) {
      const cubeSets = cubeShow.matchAll(
        /\s(?<count>\d+)\s(?<color>[blue|green|red]+)/gi,
      );
      for (const cubeSet of cubeSets) {
        const [_, count, color] = cubeSet;
        bagIsValid = parseInt(count) > bagLimits[color] ? false : bagIsValid;
      }
    }
    result += bagIsValid ? matchId : 0;
  });

  return result;
};

export const part2 = (input: string): number => {
  let result = 0;
  parseInput(input).forEach((line) => {
    const cubeShows = line.split(";");
    const bagFewedCubes: Record<string, number> = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const cubeShow of cubeShows) {
      const cubeSets = cubeShow.matchAll(
        /\s(?<count>\d+)\s(?<color>[blue|green|red]+)/gi,
      );
      for (const cubeSet of cubeSets) {
        const [_, count, color] = cubeSet;
        bagFewedCubes[color] = Math.max(parseInt(count), bagFewedCubes[color]);
      }
    }
    result += bagFewedCubes.red * bagFewedCubes.green * bagFewedCubes.blue;
  });

  return result;
};
