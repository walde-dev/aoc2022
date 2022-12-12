import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public parseInput(): number[][] {
    return this.input
      .split('\n')
      .map((line) => line.split('').map((char) => parseInt(char, 10)));
  }
  public solveFirst(): string {
    const input = this.parseInput();
    const visibleTrees: number[] = [];
    input.forEach((line, i) => {
      line.forEach((tree, j) => {
        // if we are at the edge, ignore
        if (
          i === 0 ||
          j === 0 ||
          i === input.length - 1 ||
          j === line.length - 1
        ) {
          visibleTrees.push(input[i][j]);
          return;
        }
        const row = input[i];
        const column = input.map((line) => line[j]);

        const rowLeft = row.slice(0, j);
        const rowRight = row.slice(j + 1);
        const columnTop = column.slice(0, i);
        const columnBottom = column.slice(i + 1);

        const isLargestInRow =
          Math.max(...rowLeft) < tree || Math.max(...rowRight) < tree;
        const isLargestInColumn =
          Math.max(...columnTop) < tree || Math.max(...columnBottom) < tree;

        if (isLargestInRow || isLargestInColumn) {
          visibleTrees.push(input[i][j]);
        }
      });
    });

    return visibleTrees.length.toString();
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    const input = this.parseInput();
    const scenicScore: number[] = [];
    input.forEach((line, i) => {
      line.forEach((tree, j) => {
        // if we are at the edge, ignore
        if (
          i === 0 ||
          j === 0 ||
          i === input.length - 1 ||
          j === line.length - 1
        ) {
          return;
        }

        const row = input[i];
        const column = input.map((line) => line[j]);

        let left = 0;
        for (let k = j - 1; k >= 0; k--) {
          if (row[k] < tree) {
            left++;
          } else {
            left++;
            break;
          }
        }

        let right = 0;
        for (let k = j + 1; k < row.length; k++) {
          if (row[k] < tree) {
            right++;
          } else {
            right++;
            break;
          }
        }

        let top = 0;
        for (let k = i - 1; k >= 0; k--) {
          if (column[k] < tree) {
            top++;
          } else {
            top++;
            break;
          }
        }

        let bottom = 0;
        for (let k = i + 1; k < column.length; k++) {
          if (column[k] < tree) {
            bottom++;
          } else {
            bottom++;
            break;
          }
        }
        scenicScore.push(left * right * top * bottom);
      });
    });
    return Math.max(...scenicScore).toString();
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}
