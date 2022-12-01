import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public parseInput(input: string): number[][] {
    return input
      .split('\n\n')
      .map((elf) => elf.split(' '))
      .map((elf) => elf[0].split(`\n`).map((calories) => parseInt(calories)))
      .sort((a, b) => {
        return (
          b.reduce((acc, curr) => acc + curr, 0) -
          a.reduce((acc, curr) => acc + curr, 0)
        );
      });
  }
  public solveFirst(): string {
    return this.parseInput(this.input)[0]
      .reduce((acc, curr) => acc + curr, 0)
      .toString();
  }
  public solveSecond(): string {
    return this.parseInput(this.input)
      .slice(0, 3)
      .map((elv) => elv.reduce((acc, curr) => acc + curr, 0))
      .reduce((acc, curr) => acc + curr, 0)
      .toString();
  }

  public getFirstExpectedResult(): string {
    return 'day 1 solution 1';
  }
  public getSecondExpectedResult(): string {
    return 'day 1 solution 2';
  }
}
