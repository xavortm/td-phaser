import { Scene } from 'phaser';

// To move in a config later?
const cellBackground = 0x000000;
const cellSize = 48;
const strokeWidth = 1;
const strokeColor = 0x333333;
const highlightColor = 0x4488ff;

export enum CellState {
  Empty = 'empty',
  Hover = 'hover',
  Path = 'path',
  Tower = 'tower',
  Locked = 'locked',
  PathStart = 'pathStart',
  PathEnd = 'pathEnd',
  Selected = 'selected',
}

// States that are not interactive
const lockedStates = [CellState.Locked, CellState.PathStart, CellState.PathEnd, CellState.Path];

export default class Cell extends Phaser.GameObjects.Sprite {
  private cellState: CellState = CellState.Empty;
  private isHovering: boolean = false;
  private hasTower: boolean = false;

  constructor(scene: Scene, x: number, y: number, initialState: CellState = CellState.Empty) {
    super(scene, x, y, 'tiles', 0);

    // Set up the cell's appearance
    this.setOrigin(0, 0);
    this.setScale(cellSize / 16);
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
      // Temporarily set to tower for debugging
      this.setCellState(CellState.Tower);
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
    // Update frame or color based on state
    switch (this.cellState) {
      case CellState.Empty:
        this.setFrame(85);
        // Only change tint on hover, not state
        this.setTint(this.isHovering ? highlightColor : 0x333333);
        break;
      case CellState.Selected:
        this.setFrame(200);
        break;
      case CellState.Path:
        this.setFrame(52);
        this.setTint(0xffffff);
        break;
      case CellState.PathStart:
        this.setFrame(52);
        this.setTint(0x0000ff);
        break;
      case CellState.PathEnd:
        this.setFrame(52);
        this.setTint(0xff0000);
        break;
      case CellState.Hover:
        this.setFrame(52);
        this.setTint(0x00ff00);
        break;
      case CellState.Tower:
        this.setFrame(200);
        this.setTint(this.isHovering ? highlightColor : 0xffffff);
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
