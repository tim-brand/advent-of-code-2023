// DAY: 09

const parseInput = (input: string) => {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
};

export const part1 = (input: string): number => {
  const lines = parseInput(input);
  let result = 0;
  for (const line of lines) {
    const nums = line.split(/\s/).map((n) => parseInt(n, 10));
    const seqs: number[][] = [];
    seqs.push(nums);
    while (!seqs.at(-1)!.every((n) => n === 0)) {
      const seq = seqs.at(-1)!;
      const nextSeq = seq!.reduce((acc, n, i) => {
        if (i === 0) return acc;
        return acc.concat(n - seq[i - 1]);
      }, [] as number[]);
      seqs.push(nextSeq);
    }

    for (let i = seqs.length - 1; i >= 0; i--) {
      if (i === seqs.length - 1) {
        seqs[i].push(0);
      } else {
        seqs[i].push(seqs[i].at(-1)! + seqs[i + 1].at(-1)!);
      }
    }
    result += seqs[0].at(-1)!;
  }

  return result;
};

export const part2 = (input: string): number => {
  const lines = parseInput(input);
  let result = 0;
  for (const line of lines) {
    const nums = line.split(/\s/).map((n) => parseInt(n, 10));
    const seqs: number[][] = [];
    seqs.push(nums);
    while (!seqs.at(-1)!.every((n) => n === 0)) {
      const seq = seqs.at(-1)!;
      const nextSeq = seq!.reduce((acc, n, i) => {
        if (i === 0) return acc;
        return acc.concat(n - seq[i - 1]);
      }, [] as number[]);
      seqs.push(nextSeq);
    }

    for (let i = seqs.length - 1; i >= 0; i--) {
      if (i === seqs.length - 1) {
        seqs[i].unshift(0);
      } else {
        seqs[i].unshift(seqs[i].at(0)! - seqs[i + 1].at(0)!);
      }
    }
    result += seqs[0].at(0)!;
  }

  return result;
};
