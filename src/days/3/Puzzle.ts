import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public parseInput(input: string): string[][] {
    return input.split('\n').map((rucksack) => {
      return [
        rucksack.trim().slice(0, rucksack.length / 2),
        rucksack.trim().slice(rucksack.length / 2),
      ];
    });
  }
  public solveFirst(): string {
    let result = 0;
    this.parseInput(this.input).forEach((rucksack) => {
      let foundChar = 0;
      rucksack[0].split('').forEach((item) => {
        if (rucksack[1].includes(item) && item.charCodeAt(0) !== foundChar) {
          result +=
            item.charCodeAt(0) < 97
              ? item.charCodeAt(0) - 64 + 26
              : item.charCodeAt(0) - 96;
          foundChar = item.charCodeAt(0);
        }
      });
    });
    return result.toString();
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    return 'day 1 solution 2';
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}
