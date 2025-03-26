import { Scene } from 'phaser';

// To move in a config later?
const cellBackground = 0x000000;
const cellSize = 48;
const strokeWidth = 1;
const strokeColor = 0x333333;
const highlightColor = 0x4488ff;

export enum CellState {
  Empty = 'empty',
  Path = 'path',
  Tower = 'tower',
  Locked = 'locked',
  PathStart = 'pathStart',
  PathEnd = 'pathEnd',
  Selected = 'selected',
}

// States that are not interactive
const lockedStates = [CellState.Locked, CellState.PathStart, CellState.PathEnd, CellState.Path];

export default class Cell extends Phaser.GameObjects.Rectangle {
  private cellState: CellState = CellState.Empty;
  private tower?: Phaser.GameObjects.Sprite;
  private highlight?: Phaser.GameObjects.Rectangle;
  private isHovering: boolean = false;

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
      })
      .on('pointerover', () => {
        this.handlePointerOver();
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
    if (this.cellState === CellState.Empty) {
      this.setCellState(CellState.Selected);
      this.scene.events.emit('cellSelected', this);
    }
  }

  private handlePointerOut() {
    this.isHovering = false;
    this.updateAppearance();
  }

  private handlePointerOver() {
    this.isHovering = true;
    this.updateAppearance();
  }

  private handlePointerDown() {
    // Handled by the tooltip manager
  }

  private updateAppearance() {
    switch (this.cellState) {
      case CellState.Empty:
        this.setFillStyle(cellBackground);
        this.setStrokeStyle(strokeWidth, this.isHovering ? highlightColor : strokeColor);
        break;
      case CellState.Selected:
        this.setFillStyle(cellBackground);
        this.setStrokeStyle(2, highlightColor);
        break;
      case CellState.Path:
        this.setFillStyle(0xffffff);
        this.setStrokeStyle(strokeWidth, 0xffffff);
        break;
      case CellState.PathStart:
        this.setFillStyle(0x0000ff);
        this.setStrokeStyle(strokeWidth, 0x0000ff);
        break;
      case CellState.PathEnd:
        this.setFillStyle(0xff0000);
        this.setStrokeStyle(strokeWidth, 0xff0000);
        break;
      case CellState.Tower:
        this.setFillStyle(cellBackground);
        this.setStrokeStyle(strokeWidth, this.isHovering ? highlightColor : 0x00ff00);
        break;
    }
  }

  public getCellState(): CellState {
    return this.cellState;
  }

  public getTooltipContent(): string {
    const position = `[${Math.floor(this.x / cellSize)},${Math.floor(this.y / cellSize)}]`;

    switch (this.cellState) {
      case CellState.Empty:
        return `Empty Cell ${position}\nClick to build a tower`;
      case CellState.Tower:
        return `Tower ${position}\nLevel: 1\nDamage: 10\nRange: 3`;
      case CellState.Selected:
        return `Selected Cell ${position}\nReady to build`;
      default:
        return `Cell ${position}\nState: ${this.cellState}`;
    }
  }
}
