import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public parseInput(
    input: string,
    part: 1 | 2
  ): (1 | 2 | 3 | 0 | 'L' | 'D' | 'W')[][] {
    return input.split('\n').map((round) =>
      round.split(' ').map((player) => {
        if (player === 'A') {
          return 1;
        }
        if (player === 'B') {
          return 2;
        }
        if (player === 'C') {
          return 3;
        }
        if (player === 'X') {
          return part === 1 ? 1 : 'L';
        }
        if (player === 'Y') {
          return part === 1 ? 2 : 'D';
        }
        if (player === 'Z') {
          return part === 1 ? 3 : 'W';
        }
        return 0;
      })
    );
  }

  /**
   * A,x,1 = rock
   * b,y,2 = paper
   * c,z,3 = scissors
   */
  public solveFirst(): string {
    let score = 0;
    this.parseInput(this.input, 1).forEach((round) => {
      if (round[0] === 1 && round[1] === 2) {
        score += 6;
      }
      if (round[0] === 1 && round[1] === 3) {
        score += 0;
      }
      if (round[0] === 2 && round[1] === 1) {
        score += 0;
      }
      if (round[0] === 2 && round[1] === 3) {
        score += 6;
      }
      if (round[0] === 3 && round[1] === 1) {
        score += 6;
      }
      if (round[0] === 3 && round[1] === 2) {
        score += 0;
      }
      if (round[0] === round[1]) {
        score += 3;
      }
      score += parseInt(round[1].toString());
    });
    return score.toString();
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    let score = 0;
    this.parseInput(this.input, 2).forEach((round) => {
      if (typeof round[0] === 'string') {
        return;
      }
      if (round[1] === 'L') {
        score += 0 + round[0] === 1 ? 3 : round[0] - 1;
      }
      if (round[1] === 'D') {
        score += 3 + round[0];
      }
      if (round[1] === 'W') {
        score += 6 + (round[0] === 3 ? 1 : round[0] + 1);
      }
    });
    return score.toString();
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}
