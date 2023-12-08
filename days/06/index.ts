// DAY: 06

type Race = {
  time: number;
  distance: number;
};

const parseInput = (input: string): Race[] => {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const times = lines[0]
    .split(/\s+/)
    .map((v) => Number(v))
    .filter((v) => !isNaN(v));
  const distances = lines[1]
    .split(/\s+/)
    .map((v) => Number(v))
    .filter((v) => !isNaN(v));
  return times.map((time, index) => ({ time, distance: distances[index] }));
};

const calculateRecords = (race: Race): number => {
  let wins = 0;
  for (let speed = 0; speed <= race.time; speed++) {
    const mmTravelled = speed * (race.time - speed);
    if (mmTravelled > race.distance) wins++;
  }
  return wins;
};

export const part1 = (input: string): number => {
  const races = parseInput(input);
  let multiplier = 1;
  races.forEach((race) => {
    multiplier *= calculateRecords(race);
  });

  return multiplier;
};

export const part2 = (input: string): number => {
  const [time, distance] = input
    .split("\n")
    .map((line) => line.split(":")[1].trim().replaceAll(" ", ""))
    .filter((line) => line.length > 0)
    .map((line) => Number(line));

  let firstWinIdx = -1;
  let lastWinIdx = -1;

  for (let speed = 0; speed <= time; speed++) {
    const mmTravelled = speed * (time - speed);
    if (mmTravelled > distance) {
      firstWinIdx = speed;
      break;
    }
  }

  for (let speed = time; speed >= 0; speed--) {
    const mmTravelled = speed * (time - speed);
    if (mmTravelled > distance) {
      lastWinIdx = speed;
      break;
    }
  }

  return lastWinIdx - firstWinIdx + 1;
};
