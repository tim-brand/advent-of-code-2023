// DAY: 08

type Node = {
  index: number;
  start: string;
  L: string;
  R: string;
};

const parseInput = (input: string) => {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const nodes: Record<string, Node> = {};
  for (let line = 1; line < lines.length; line++) {
    const match = lines[line].match(
      /(?<start>[A-Z0-9]{3})\s=\s\((?<L>[A-Z0-9]{3}),\s(?<R>[A-Z0-9]{3})\)/,
    );
    const start = match!.groups!.start;
    nodes[start] = {
      index: line - 1,
      start,
      L: match!.groups!.L,
      R: match!.groups!.R,
    };
  }

  return {
    instructions: lines[0].split("").filter(Boolean),
    nodes,
  };
};

const lcm = (arr: number[]): number =>
  arr.reduce((acc, n) => (acc * n) / gcd(acc, n));

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export const part1 = (input: string): number => {
  const { instructions, nodes } = parseInput(input);
  let steps = 0;
  let currentPos = "AAA";
  while (currentPos !== "ZZZ") {
    const node = nodes[currentPos];
    const instruction = instructions[steps % instructions.length];
    currentPos = instruction === "L" ? node.L : node.R;
    steps++;
  }

  return steps;
};

export const part2 = (input: string): number => {
  const { instructions, nodes } = parseInput(input);
  const startNodeSteps = Object.values(nodes)
    .filter((node) => node.start.endsWith("A"))
    .map((node) => node.start)
    .map((start) => {
      let steps = 0;
      let curr = start;
      for (
        let i = 0;
        curr && !curr.endsWith("Z");
        i = (i + 1) % instructions.length
      ) {
        steps++;
        const node = nodes[curr];
        if (instructions[i] === "L") {
          curr = node.L;
        } else {
          curr = node.R;
        }
      }
      return steps;
    });
  return lcm(startNodeSteps);
};
