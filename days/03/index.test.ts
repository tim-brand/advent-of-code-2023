import { describe, expect, it } from "bun:test";

import { part1, part2 } from ".";

describe("day 03", () => {
  const input = `467..114..
                 ...*......
                 ..35..633.
                 ......#...
                 617*......
                 .....+.58.
                 ..592.....
                 ......755.
                 ...$.*....
                 .664.598..`;
  describe("part 1", () => {
    it("should work with the sample input", () => {
      expect(part1(input)).toBe(4361);
    });
  });

  describe("part 2", () => {
    it("should work with the sample input", () => {
      expect(part2(input)).toBe(467835);
    });
  });
});
