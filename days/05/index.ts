// DAY: 05

type RangeLookup = {
  source: number;
  destination: number;
  length: number;
};

const getLookup = (values: RangeLookup[]) => {
  return (value: number) => {
    const item = values.find((v) => value >= v.source && value < v.source + v.length);
    if (!item) return value;
    const difference = value - item.source;
    return item.destination + difference;
  };
};

const getReverseLookup = (values: RangeLookup[]) => {
  return (value: number) => {
    const item = values.find((v) => value >= v.destination && value < v.destination + v.length);
    if (!item) return value;
    const difference = value - item.destination;
    return item.source + difference;
  };
};

const prepare = (input: string) => {
  return input
    .split(/\n\n/)
    .filter(Boolean)
    .map((n) => {
      const regex = new RegExp(/^([a-zA-Z-]+)(\smap)?:[\s\n]?(.*)/, "ms");
      const matches = n.match(regex);
      const name = matches?.[1];
      if (name === "seeds") {
        const values = matches![3]
          .trim()
          .split(/\s+/)
          .map((v) => Number(v));
        const pairs = [];
        for (let i = 0; i < values.length; i++) {
          if (i % 2 === 0 || !i) {
            pairs.push({
              start: values[i],
              end: values[i] + (values[i + 1] ?? 0) - 1,
            });
          }
        }
        return {
          values,
          pairs,
        };
      }
      const values: RangeLookup[] =
        matches?.[3]
          ?.trim()
          .split(/\n/)
          .map((v) => {
            const [destination, source, length] = v?.split(/\s+/).map((v) => Number(v)) ?? [];
            return { destination, source, length };
          }) ?? [];
      return {
        lookup: getLookup(values),
        reverseLookup: getReverseLookup(values),
      };
    });
};

export const part1 = (input: string): number => {
  let result = Number.MAX_VALUE;
  const data = prepare(input);
  const [seeds, ...rest] = data;
  seeds.values!.forEach((seed) => {
    let prevId = seed;
    rest.forEach((item) => {
      const newValue = item.lookup?.(prevId);
      if (newValue !== undefined) {
        prevId = newValue;
      }
    });
    result = Math.min(result, prevId);
  });

  return result;
};

export const part2 = (input: string): number => {
  const timer = Date.now();
  const data = prepare(input);
  const [seeds, ...rest] = data;
  const steps = rest.reverse();
  let location = 0;
  let found = false;
  while (!found && location < 100000000) {
    let prevId = location;
    steps.forEach((item) => {
      const newValue = item.reverseLookup?.(prevId);
      if (newValue !== undefined) {
        prevId = newValue;
      }
    });
    const isInRange = seeds.pairs?.filter((s) => prevId >= s.start && prevId <= s.end) ?? [];
    if (isInRange.length) {
      found = true;
    } else {
      location += 1;
    }
  }
  console.log(`part 2 took ${Date.now() - timer}ms`);
  return location;
};
