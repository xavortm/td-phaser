import GameManager from '@/managers/Game';
import Cell from '@/entities/Cell';

export default class GridManager {
  private gameManager: GameManager;
  private grid: Phaser.GameObjects.Rectangle[][];
  private gridContainer: Phaser.GameObjects.Container;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
    this.generateInteractiveGrid(19, 13);
  }

  public getGrid(): Phaser.GameObjects.Rectangle[][] {
    return this.grid;
  }

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
