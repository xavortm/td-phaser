import { Scene } from 'phaser';
import Cell from '@/entities/Cell';
import GameManager from '@/managers/Game';

// The game will be a single scene that the player has to complete for give time.
// There are no levels. Works like Belatro in a way.

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;

  private gridContainer: Phaser.GameObjects.Container;
  private grid: Phaser.GameObjects.Rectangle[][];
  private gameManager: GameManager;

  constructor() {
    super('Game');
  }

  create() {
    this.gameManager = new GameManager(this);

    const padding = [55, 75]; // Padding from edges

    // Create container for grid
    this.gridContainer = this.add.container(padding[0], padding[1]);

    // Generate grid
    this.generateInteractiveGrid(19, 13);

    // Launch UI scene
    this.scene.launch('UI');

    // Set up event communication
    this.events.emit('gameReady');
  }

  private generateInteractiveGrid(cols: number, rows: number) {
    // Calculate cell dimensions
    const cellWidth = 48;
    const cellHeight = 48;
    this.grid = [];

    for (let row = 0; row < rows; row++) {
      this.grid[row] = [];
      for (let col = 0; col < cols; col++) {
        const cell = new Cell(this, col * cellWidth, row * cellHeight);

        // Store reference to cell
        this.grid[row][col] = cell;

        // Add to container
        this.gridContainer.add(cell);
      }
    }
  }
}
