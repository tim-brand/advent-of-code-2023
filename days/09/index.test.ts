import { describe, expect, it } from "bun:test";

import { part1, part2 } from ".";

describe("day 09", () => {
  const input = `0 3 6 9 12 15
  1 3 6 10 15 21
  10 13 16 21 30 45`;
  describe("part 1", () => {
    it("should work with the sample input", () => {
      expect(part1(input)).toBe(114);
    });
  });

  describe("part 2", () => {
    it("should work with the sample input", () => {
      expect(part2(input)).toBe(2);
    });
  });
});
