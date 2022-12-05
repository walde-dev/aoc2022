import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public parseInput(input: string): number[][][] {
    return input.split('\n').map((pair) =>
      pair
        .split(',')
        .map((elf) => elf.split('-'))
        .map((range) => range.map((num) => parseInt(num)))
    );
  }
  public solveFirst(): string {
    let counter = 0;
    this.parseInput(this.input).forEach((pair) => {
      const [min1, max1] = pair[0];
      const [min2, max2] = pair[1];
      if (min1 <= min2 && max1 >= max2) {
        counter++;
      } else if (min2 <= min1 && max2 >= max1) {
        counter++;
      }
    });
    return counter.toString();
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    // same as solveFirst but now check if the ranges overlap at all
    let counter = 0;
    this.parseInput(this.input).forEach((pair) => {
      const [min1, max1] = pair[0];
      const [min2, max2] = pair[1];
      if (min1 <= min2 && max1 >= max2) {
        counter++;
      } else if (min2 <= min1 && max2 >= max1) {
        counter++;
      } else if (min1 <= min2 && max1 >= min2) {
        counter++;
      } else if (min2 <= min1 && max2 >= min1) {
        counter++;
      }
    });
    return counter.toString();
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}
