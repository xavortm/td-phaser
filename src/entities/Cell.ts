import { Scene } from 'phaser';

// To move in a config later?
const cellBackground = 0x000000;
const cellSize = 48;
const strokeWidth = 1;
const strokeColor = 0x333333;

export enum CellState {
  Empty = 'empty',
  Path = 'path',
  Tower = 'tower',
  Locked = 'locked',
  PathStart = 'pathStart',
  PathEnd = 'pathEnd',
}

// States that are not interactive
const lockedStates = [CellState.Locked, CellState.PathStart, CellState.PathEnd, CellState.Path];

export default class Cell extends Phaser.GameObjects.Rectangle {
  private cellState: CellState = CellState.Empty;
  private tower?: Phaser.GameObjects.Sprite;
  private highlight?: Phaser.GameObjects.Rectangle;

  constructor(scene: Scene, x: number, y: number, initialState: CellState = CellState.Empty) {
    super(scene, x, y, cellSize, cellSize, cellBackground);

    // Set up the cell's appearance
    this.setOrigin(0, 0);
    lockedStates.includes(initialState) ? this.disableInteractive() : this.setInteractive();

    this.on('pointerdown', () => {
      this.handlePointerDown();
    })
      .on('pointerup', () => {
        this.handlePointerUp();
      })
      .on('pointerout', () => {
        this.handlePointerOut();
      });

    // Initialize cell state
    this.setCellState(initialState);
  }

  public setCellState(newState: CellState): void {
    this.cellState = newState;
    this.updateAppearance();
    lockedStates.includes(newState) ? this.disableInteractive() : this.setInteractive();
  }

  private handlePointerUp() {
    // TODO: Implement
  }

  private handlePointerOut() {
    // TODO: Implement
  }

  private handlePointerDown() {
    this.printDebugData();
    // TODO: Implement
  }

  private updateAppearance() {
    switch (this.cellState) {
      case CellState.Empty:
        this.setFillStyle(cellBackground);
        this.setStrokeStyle(strokeWidth, strokeColor);
        break;
      case CellState.Path:
        // TODO: Use a nicer graphic or color for the path of the enemies.
        this.setFillStyle(0xffffff);
        this.setStrokeStyle(strokeWidth, 0xffffff);
        break;
      case CellState.PathStart:
        this.setFillStyle(0x0000ff);
        this.setStrokeStyle(strokeWidth, 0x0000ff);
        break;
      case CellState.PathEnd:
        this.setFillStyle(0xff00000);
        this.setStrokeStyle(strokeWidth, 0xff00000);
        break;
    }
  }

  private printDebugData() {
    console.log('Cell debug data:');
    console.log('Location:', this.x, this.y);
    console.log('State:', this.cellState);
    console.log('--------------------------------');
  }

  public getCellState(): CellState {
    return this.cellState;
  }
}
