import GameManager from '@/managers/Game';
import Cell, { CellState } from '@/entities/Cell';

export default class GridManager {
  private gameManager: GameManager;
  private grid: Cell[][];
  private gridContainer: Phaser.GameObjects.Container;
  private spawnPoints: Phaser.GameObjects.Rectangle[];

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
    this.generateInteractiveGrid(19, 13);
  }

  public getGrid(): Cell[][] {
    return this.grid;
  }

  public getGridContainer(): Phaser.GameObjects.Container {
    return this.gridContainer;
  }

  public getSpawnPoints(): Phaser.GameObjects.Rectangle[] {
    return this.spawnPoints;
  }

  public createPath(wave: number) {
    // TODO: Make this a function that creates a path based on the wave number.
    // And of course, make it generate paths with a nicer format than this.
    for (let i = 0; i < this.grid[0].length; i++) {
      const cell = this.grid[5][i];
      cell.setCellState(CellState.Path);
    }

    // Cell start:
    const cellStart = this.grid[5][0];
    cellStart.setCellState(CellState.PathStart);

    // Cell end:
    const cellEnd = this.grid[5][this.grid[0].length - 1];
    cellEnd.setCellState(CellState.PathEnd);

    // Spawn points:
    this.setSpawnPoints(this.grid[5]);
  }

  private setSpawnPoints(spawnPoints: Phaser.GameObjects.Rectangle[]): void {
    this.spawnPoints = spawnPoints;
  }

  /**
   * Called when initializing the grid and is not needed afterwards.
   */
  private generateInteractiveGrid(cols: number, rows: number) {
    const padding = [55, 75]; // Padding from edges
    const scene = this.gameManager.getScene();
    this.gridContainer = scene.add.container(padding[0], padding[1]);

    // Calculate cell dimensions
    const cellWidth = 48;
    const cellHeight = 48;
    this.grid = [];

    for (let row = 0; row < rows; row++) {
      this.grid[row] = [];
      for (let col = 0; col < cols; col++) {
        const cell = new Cell(scene, col * cellWidth, row * cellHeight);

        // Store reference to cell
        this.grid[row][col] = cell;

        // Add to container
        this.gridContainer.add(cell);
      }
    }
  }
}
