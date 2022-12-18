import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public parseInput() {
    return this.input.split('\n').map((line) => line.split(' '));
  }
  public solveFirst(): string {
    const input = this.parseInput();
    const headPosition = [0, 0];
    const tailPosition = [0, 0];
    const visited = new Set();
    visited.add(tailPosition.toString());
    input.forEach((instruction) => {
      const direction = instruction[0] as 'L' | 'R' | 'U' | 'D';
      const distance = parseInt(instruction[1]);
      for (let i = 0; i < distance; i++) {
        // check if head and tail are next to each other
        if (
          !(
            (headPosition[0] === tailPosition[0] + 1 ||
              headPosition[0] === tailPosition[0] - 1) &&
            headPosition[1] === tailPosition[1]
          ) &&
          !(
            (headPosition[1] === tailPosition[1] + 1 ||
              headPosition[1] === tailPosition[1] - 1) &&
            headPosition[0] === tailPosition[0]
          ) &&
          !(
            (headPosition[0] === tailPosition[0] + 1 ||
              headPosition[0] === tailPosition[0] - 1) &&
            (headPosition[1] === tailPosition[1] + 1 ||
              headPosition[1] === tailPosition[1] - 1)
          )
        ) {
          // if they arent, move tail next to head
          if (
            headPosition[0] === tailPosition[0] ||
            headPosition[1] === tailPosition[1]
          ) {
            if (headPosition[0] > tailPosition[0]) {
              tailPosition[0] += 1;
            }
            if (headPosition[0] < tailPosition[0]) {
              tailPosition[0] -= 1;
            }
            if (headPosition[1] > tailPosition[1]) {
              tailPosition[1] += 1;
            }
            if (headPosition[1] < tailPosition[1]) {
              tailPosition[1] -= 1;
            }
          } else {
            // need to move tail diagonally next to head
            if (
              headPosition[0] > tailPosition[0] &&
              headPosition[1] > tailPosition[1]
            ) {
              tailPosition[0] += 1;
              tailPosition[1] += 1;
            }
            if (
              headPosition[0] > tailPosition[0] &&
              headPosition[1] < tailPosition[1]
            ) {
              tailPosition[0] += 1;
              tailPosition[1] -= 1;
            }
            if (
              headPosition[0] < tailPosition[0] &&
              headPosition[1] > tailPosition[1]
            ) {
              tailPosition[0] -= 1;
              tailPosition[1] += 1;
            }
            if (
              headPosition[0] < tailPosition[0] &&
              headPosition[1] < tailPosition[1]
            ) {
              tailPosition[0] -= 1;
              tailPosition[1] -= 1;
            }
          }
          // add tail to visited if not already there
          if (!visited.has(tailPosition.toString())) {
            visited.add(tailPosition.toString());
          }
        }
        switch (direction) {
          case 'L':
            headPosition[0] -= 1;
            break;
          case 'R':
            headPosition[0] += 1;
            break;
          case 'U':
            headPosition[1] += 1;
            break;
          case 'D':
            headPosition[1] -= 1;
            break;
        }
      }
    });
    console.log(visited);
    return visited.size.toString();
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
