import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const input = this.input.split('');
    let result = 0;
    const mostRecentFourChars: string[] = [];
    input.forEach((char, i) => {
      if (result !== 0) {
        return;
      }
      mostRecentFourChars.push(char);
      if (mostRecentFourChars.length > 4) {
        mostRecentFourChars.shift();
      }
      if (mostRecentFourChars.length === 4) {
        const uniqueChars = new Set(mostRecentFourChars);
        if (uniqueChars.size === 4) {
          result = i + 1;
          return;
        }
      }
    });
    return result.toString();
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    const input = this.input.split('');
    let result = 0;
    const mostRecentFourChars: string[] = [];
    input.forEach((char, i) => {
      if (result !== 0) {
        return;
      }
      mostRecentFourChars.push(char);
      if (mostRecentFourChars.length > 14) {
        mostRecentFourChars.shift();
      }
      if (mostRecentFourChars.length === 14) {
        const uniqueChars = new Set(mostRecentFourChars);
        if (uniqueChars.size === 14) {
          result = i + 1;
          return;
        }
      }
    });
    return result.toString();
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}
