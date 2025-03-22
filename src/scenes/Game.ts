import { Scene } from 'phaser';
import UI from '@/scenes/UI';

// The game will be a single scene that the player has to complete for give time.
// There are no levels. Works like Belatro in a way.

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;

  private gridContainer: Phaser.GameObjects.Container;
  private grid: Phaser.GameObjects.Rectangle[][];

  constructor() {
    super('Game');
  }

  create() {
    this.scene.launch('UI');

    const width = Number(this.game.config.width);
    const height = Number(this.game.config.height);
    const padding = 20; // Padding from edges

    // Create container for grid
    this.gridContainer = this.add.container(padding + 100, padding + 100);

    // Calculate playable area
    const playableWidth = width - padding * 2 - 100;
    const playableHeight = height - padding * 2 - 100;

    // Generate grid with 10x10 cells
    this.generateInteractiveGrid(16, 10);
  }

  private generateInteractiveGrid(cols: number, rows: number) {
    // Calculate cell dimensions
    const cellWidth = 48;
    const cellHeight = 48;
    const strokeWidth = 1;
    this.grid = [];

    for (let row = 0; row < rows; row++) {
      this.grid[row] = [];
      for (let col = 0; col < cols; col++) {
        const cell = this.add.rectangle(
          col * cellWidth,
          row * cellHeight,
          cellWidth - strokeWidth, // Subtract stroke width
          cellHeight - strokeWidth, // Subtract stroke width
          0x000000
        );

        // Set origin to top-left for easier positioning
        cell.setOrigin(0, 0);

        // Add stroke to see grid lines
        cell.setStrokeStyle(strokeWidth, 0x333333);

        // Make interactive
        cell.setInteractive();
        cell.on('pointerdown', () => {
          cell.setFillStyle(0xffffff);
        });

        cell.on('pointerup', () => {
          cell.setFillStyle(0x000000);
        });

        cell.on('pointerout', () => {
          cell.setFillStyle(0x000000);
        });

        // Store reference to cell
        this.grid[row][col] = cell;

        // Add to container
        this.gridContainer.add(cell);
      }
    }
  }
}
