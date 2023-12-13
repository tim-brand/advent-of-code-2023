import { describe, expect, it } from "bun:test";

import { part1, part2 } from ".";

describe("day 08", () => {
  describe("part 1", () => {
    it("should work with the sample input", () => {
      const input = `LLR
    
      AAA = (BBB, BBB)
      BBB = (AAA, ZZZ)
      ZZZ = (ZZZ, ZZZ)`;
      expect(part1(input)).toBe(6);
    });
  });

  describe("part 2", () => {
    it("should work with the sample input", () => {
      const input = `LR

      11A = (11B, XXX)
      11B = (XXX, 11Z)
      11Z = (11B, XXX)
      22A = (22B, XXX)
      22B = (22C, 22C)
      22C = (22Z, 22Z)
      22Z = (22B, 22B)
      XXX = (XXX, XXX)`;
      expect(part2(input)).toBe(6);
    });
  });
});
