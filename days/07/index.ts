// DAY: 07

type Hand = {
  cards: string;
  bid: number;
  score: number;
  type: HandType;
};

enum HandType {
  FiveOfAKind = 7,
  FourOfAKind = 6,
  FullHouse = 5,
  ThreeOfAKind = 4,
  TwoPair = 3,
  OnePair = 2,
  HighCard = 1,
}

const parseInput = (input: string, useJokers: boolean): Hand[] => {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const hands: Hand[] = [];
  for (const line of lines) {
    const [cards, bid] = line.split(" ");
    hands.push({
      cards,
      bid: Number(bid),
      score: 0,
      type: getHandType(cards, useJokers),
    });
  }
  return hands;
};

const countCarts = (hand: string, ignoreJokers: boolean): number[] => {
  const cards = (ignoreJokers ? hand.replaceAll("J", "") : hand).split("");
  const cardCounts = new Map<string, number>();
  for (const card of cards) {
    const count = cardCounts.get(card) ?? 0;
    cardCounts.set(card, count + 1);
  }
  return [...cardCounts.values()];
};

const getHandType = (cards: string, useJokers: boolean): HandType => {
  const cardCounts = countCarts(cards, useJokers);
  if (isFiveOfAKind(cards, useJokers)) {
    return HandType.FiveOfAKind;
  } else if (isFourOfAKind(cards, useJokers)) {
    return HandType.FourOfAKind;
  } else if (isFullHouse(cards, useJokers)) {
    return HandType.FullHouse;
  } else if (isThreeOfAKind(cards, useJokers)) {
    return HandType.ThreeOfAKind;
  } else if (isTwoPair(cards, useJokers)) {
    return HandType.TwoPair;
  } else if (isOnePair(cards, useJokers)) {
    return HandType.OnePair;
  } else if (cardCounts.filter((count) => count === 1).length === 5) {
    return HandType.HighCard;
  }
  console.log(cards, cardCounts, useJokers);
  throw new Error("Unknown hand type");
};

const countJokers = (cards: string): number => cards.split("J").length - 1;

const isFiveOfAKind = (cards: string, useJokers: boolean): boolean => {
  const cardCounts = countCarts(cards, useJokers);
  const jokerCount = countJokers(cards);
  return (
    cardCounts.includes(5) ||
    (useJokers && cards === "JJJJJ") ||
    (useJokers &&
      ((jokerCount === 1 && cardCounts.includes(4)) ||
        (jokerCount === 2 && cardCounts.includes(3)) ||
        (jokerCount === 3 && cardCounts.includes(2)) ||
        jokerCount === 4))
  );
};
const isFourOfAKind = (cards: string, useJokers: boolean): boolean => {
  const cardCounts = countCarts(cards, useJokers);
  const jokerCount = countJokers(cards);
  return (
    cardCounts.includes(4) ||
    (useJokers &&
      ((jokerCount === 1 && cardCounts.includes(3)) ||
        (jokerCount === 2 && cardCounts.includes(2)) ||
        jokerCount === 3))
  );
};
const isFullHouse = (cards: string, useJokers: boolean): boolean => {
  const cardCounts = countCarts(cards, useJokers);
  const jokerCount = countJokers(cards);
  return (
    (cardCounts.includes(3) && cardCounts.includes(2)) ||
    (useJokers &&
      jokerCount >= 1 &&
      cardCounts.filter((count) => count === 2).length === 2)
  );
};
const isThreeOfAKind = (cards: string, useJokers: boolean): boolean => {
  const cardCounts = countCarts(cards, useJokers);
  const jokerCount = countJokers(cards);
  return (
    cardCounts.includes(3) ||
    (useJokers &&
      ((jokerCount === 1 && cardCounts.includes(2)) ||
        (jokerCount === 2 &&
          cardCounts.filter((count) => count === 1).length === 3)))
  );
};
const isTwoPair = (cards: string, useJokers: boolean): boolean => {
  const cardCounts = countCarts(cards, useJokers);
  const jokerCount = countJokers(cards);
  return (
    cardCounts.filter((count) => count === 2).length === 2 ||
    (useJokers &&
      jokerCount >= 1 &&
      cardCounts.includes(2) &&
      cardCounts.includes(1))
  );
};
const isOnePair = (cards: string, useJokers: boolean): boolean => {
  const cardCounts = countCarts(cards, useJokers);
  const jokerCount = countJokers(cards);
  return (
    cardCounts.includes(2) ||
    (useJokers && jokerCount >= 1 && cardCounts.includes(1))
  );
};

export const part1 = (input: string): number => {
  const hands = parseInput(input, false);

  const cartValues: Record<string, number> = {
    A: 0xc,
    K: 0xb,
    Q: 0xa,
    J: 0x9,
    T: 0x8,
    9: 0x7,
    8: 0x6,
    7: 0x5,
    6: 0x4,
    5: 0x3,
    4: 0x2,
    3: 0x1,
    2: 0x0,
  };
  const sortedHands = hands
    .sort(
      (a, b) =>
        b.type - a.type ||
        cartValues[b.cards[0]] - cartValues[a.cards[0]] ||
        cartValues[b.cards[1]] - cartValues[a.cards[1]] ||
        cartValues[b.cards[2]] - cartValues[a.cards[2]] ||
        cartValues[b.cards[3]] - cartValues[a.cards[3]] ||
        cartValues[b.cards[4]] - cartValues[a.cards[4]],
    )
    .reverse();

  return sortedHands.reduce((acc, hand, index) => {
    // console.log(index + 1, hand.cards, hand.bid);
    return acc + hand.bid * (index + 1);
  }, 0);
};

export const part2 = (input: string): number => {
  const hands = parseInput(input, true);
  hands.forEach((hand, index) => {
    console.log(
      index,
      hand.cards,
      hand.bid.toString().padEnd(3),
      HandType[hand.type],
    );
  });

  const cartValues: Record<string, number> = {
    A: 0xc,
    K: 0xb,
    Q: 0xa,
    T: 0x9,
    9: 0x8,
    8: 0x7,
    7: 0x6,
    6: 0x5,
    5: 0x4,
    4: 0x3,
    3: 0x2,
    2: 0x1,
    J: 0x0,
  };
  const sortedHands = hands
    .sort(
      (a, b) =>
        b.type - a.type ||
        cartValues[b.cards[0]] - cartValues[a.cards[0]] ||
        cartValues[b.cards[1]] - cartValues[a.cards[1]] ||
        cartValues[b.cards[2]] - cartValues[a.cards[2]] ||
        cartValues[b.cards[3]] - cartValues[a.cards[3]] ||
        cartValues[b.cards[4]] - cartValues[a.cards[4]],
    )
    .reverse();

  return sortedHands.reduce((acc, hand, index) => {
    // console.log(index + 1, hand.cards, hand.bid);
    return acc + hand.bid * (index + 1);
  }, 0);
};
