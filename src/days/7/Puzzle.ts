import Puzzle from '../../types/AbstractPuzzle';

class DataPoint {
  public name: string;
  public size: number;
  public children: DataPoint[];
  public parent: DataPoint;
  public type: 'file' | 'folder';

  constructor(
    name: string,
    size: number,
    children: DataPoint[],
    parent: DataPoint,
    type: 'file' | 'folder'
  ) {
    this.name = name;
    this.size = size;
    this.children = children;
    this.parent = parent;
    this.type = type;
  }

  public up(): DataPoint {
    return this.parent;
  }

  public down(): DataPoint[] {
    return this.children;
  }

  public addChildren(child: DataPoint) {
    this.children.push(child);
  }

  public addParent(parent: DataPoint) {
    this.parent = parent;
  }

  public toString(): string {
    // print each directory and file, using tabulator spaces to show the hierarchy
    let result = '';
    const tabulator = '  ';
    const print = (dataPoint: DataPoint, tab: string) => {
      result += `${tab}${dataPoint.name} (${dataPoint.size}) [${dataPoint.type}]\n`;
      dataPoint.children.forEach((child) => {
        print(child, tab + tabulator);
      });
    };
    print(this, '');
    return result;
  }
}

export default class ConcretePuzzle extends Puzzle {
  public parseInput() {
    return this.input.split('\n');
  }

  public init() {
    const input = this.parseInput();
    let lastCommand = '';
    const root = new DataPoint('/', 0, [], null, 'folder');
    let currentFolder: DataPoint = root;

    input.forEach((line) => {
      const command = line.split(' ');
      if (!currentFolder) {
        currentFolder = root;
      }

      if (line.startsWith('$')) {
        lastCommand = line.split(' ')[1];
      }

      if (lastCommand === 'cd') {
        if (line.split(' ')[2] === '..') {
          currentFolder = currentFolder.up();

          return;
        }

        if (
          !currentFolder.children.find((child) => child.name === command[2]) &&
          currentFolder.name !== command[2]
        ) {
          currentFolder.addChildren(
            new DataPoint(command[2], 0, [], currentFolder, 'folder')
          );
        }

        currentFolder = currentFolder.children.find(
          (child) => child.name === command[2]
        );
      }

      // creating files
      if (lastCommand === 'ls') {
        if (command[0] === 'dir') {
          if (
            !currentFolder.children.find((child) => child.name === command[1])
          ) {
            currentFolder.addChildren(
              new DataPoint(command[1], 0, [], currentFolder, 'folder')
            );
          }
        }
        if (command[0].match(/\d+/)) {
          if (
            !currentFolder.children.find((child) => child.name === command[1])
          ) {
            currentFolder.addChildren(
              new DataPoint(
                command[1],
                parseInt(command[0]),
                [],
                currentFolder,
                'file'
              )
            );
          }
        }
      }
    });

    const setFolderSize = (folder: DataPoint) => {
      folder.children.forEach((child) => {
        if (child.children.length > 0) {
          setFolderSize(child);
        }
        folder.size += child.size;
      });
    };
    setFolderSize(root);

    return root;
  }

  public solveFirst(): string {
    const root = this.init();

    const findSmallFolders = (folder: DataPoint): DataPoint[] => {
      let result: DataPoint[] = [];
      folder.children.forEach((child) => {
        if (child.type === 'file') {
          return;
        }
        if (child.children.length > 0) {
          result = result.concat(findSmallFolders(child));
        }
        if (child.size <= 100000) {
          result.push(child);
        }
      });
      return result;
    };

    return findSmallFolders(root)
      .reduce((acc, folder) => acc + folder.size, 0)
      .toString();
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    const root = this.init();
    let result = 0;
    const fileSpaceNeeded = 30000000 - (70000000 - root.size);
    const allFolders: DataPoint[] = [];
    const findAllFolders = (folder: DataPoint) => {
      folder.children.forEach((child) => {
        if (child.type === 'folder') {
          allFolders.push(child);
          findAllFolders(child);
        }
      });
    };
    findAllFolders(root);

    allFolders.sort((a, b) => a.size - b.size);

    allFolders.forEach((folder) => {
      if (result > 0) {
        return;
      }

      if (folder.size >= fileSpaceNeeded) {
        result = folder.size;
        return;
      }
    });

    return result.toString();
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}
