import { describe, expect, it } from "bun:test";

import { part1, part2 } from ".";

describe("day 07", () => {
  const input = `32T3K 765
  T55J5 684
  KK677 28
  KTJJT 220
  QQQJA 483`;
  describe("part 1", () => {
    it("should work with the sample input", () => {
      expect(part1(input)).toBe(6440);
    });
  });

  describe("part 2", () => {
    it("should work with the sample input", () => {
      expect(part2(input)).toBe(5905);
    });
  });
});
