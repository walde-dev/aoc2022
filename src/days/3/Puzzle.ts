import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public parseInput(input: string, part: 1 | 2): string[][] {
    return part === 1
      ? input.split('\n').map((rucksack) => {
          return [
            rucksack.trim().slice(0, rucksack.length / 2),
            rucksack.trim().slice(rucksack.length / 2),
          ];
        })
      : input
          .split('\n')
          .map((rucksack, i, arr) => {
            if ((i + 1) % 3 === 0) {
              return [arr[i - 2], arr[i - 1], arr[i]];
            } else {
              return [];
            }
          })
          .filter((rucksack) => rucksack.length > 0);
  }
  public solveFirst(): string {
    let result = 0;
    this.parseInput(this.input, 1).forEach((rucksack) => {
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
    let result = 0;
    this.parseInput(this.input, 2).forEach((rucksack) => {
      let foundChar = 0;
      rucksack[0].split('').forEach((item) => {
        if (
          rucksack[1].includes(item) &&
          rucksack[2].includes(item) &&
          item.charCodeAt(0) !== foundChar
        ) {
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

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}
