import { describe, expect, it } from "bun:test";

import { part1, part2 } from ".";

describe("day 06", () => {
  const input = `Time:      7  15   30
Distance:  9  40  200`;

  describe("part 1", () => {
    it("should work with the sample input", () => {
      expect(part1(input)).toBe(288);
    });
  });

  describe("part 2", () => {
    it("should work with the sample input", () => {
      expect(part2(input)).toBe(71503);
    });
  });
});
