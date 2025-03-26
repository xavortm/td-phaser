import Label from '@/ui/components/Label';
import { formatTime } from '@/utils/time';
import { Button } from '@/ui/components/Button';
import Cell from '@/entities/Cell';

// For now, I will keep some variables here for the game config, but later, move them to the game config file.
const TIME_TO_COMPLETE = 30 * 60 * 1000; // 30 minutes
const VERSION = 'v0.0.1';

class UI extends Phaser.Scene {
  private gameContainer: Phaser.GameObjects.Rectangle;
  private gameStateContainer: Phaser.GameObjects.Rectangle;
  private scoreText: Phaser.GameObjects.Text;
  private timeText: Phaser.GameObjects.Text;
  private timeRemaining: number;
  private timer: Phaser.Time.TimerEvent;
  private versionLabel: Label;
  private width: number;
  private height: number;
  private offset: number;
  constructor() {
    super({ key: 'UI' });
  }

  create() {
    this.width = Number(this.game.config.width);
    this.height = Number(this.game.config.height);
    this.offset = 10;

    // Create UI elements
    this.setupGameContainer();
    this.setupGameStateInfo();
    this.setupVersionLabel();
    this.setupDebugButtons();

    // Listen for game events
    const gameScene = this.scene.get('Game');
    gameScene.events.on('waveStarted', () => {
      this.startTimer();
    });

    gameScene.events.on('cellSelected', (cell: Cell) => {
      this.handleCellSelected(cell);
    });

    // Signal UI is ready. We can use this across the game.
    gameScene.events.emit('uiReady');
  }

  private setupGameContainer() {
    // A large rectangle to contain the game visually
    this.gameContainer = this.add
      .rectangle(
        this.offset,
        this.offset,
        this.width - this.offset * 2,
        this.height - this.offset * 2,
        0x000000,
        0
      )
      .setName('gameContainer');

    this.gameContainer.setOrigin(0, 0);
    this.gameContainer.setStrokeStyle(4, 0xffffff, 1);
  }

  private setupDebugButtons() {
    new Button(this, this.offset + 100, this.height - this.offset - 20, 'Debug', {
      fontSize: '12px',
    });
  }

  // Top info bar
  private setupGameStateInfo() {
    this.gameStateContainer = this.add
      .rectangle(this.offset, this.offset, this.width - this.offset * 2, 20)
      .setName('gameStateContainer');
    this.gameStateContainer.setOrigin(0, 0);
    this.gameStateContainer.setStrokeStyle(1, 0xffffff, 1);

    // Add text displays for game state
    this.scoreText = this.add.text(this.offset + 10, this.offset + 4, 'Score: 0', {
      fontSize: '12px',
    });

    this.timeText = this.add
      .text(
        this.width - this.offset - 10,
        this.offset + 4,
        `Time: ${formatTime(TIME_TO_COMPLETE)}`,
        {
          fontSize: '12px',
        }
      )
      .setOrigin(1, 0);
  }

  private startTimer() {
    // Track the time remaining
    this.timeRemaining = TIME_TO_COMPLETE;

    this.timer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeRemaining -= 1000;
        this.updateTimer();
      },
      callbackScope: this,
      loop: true,
    });
  }

  private setupVersionLabel() {
    this.versionLabel = new Label(
      this,
      this.width - 20,
      this.height - 20,
      `${VERSION}, built by @xavortm`,
      {
        fontSize: 10,
      }
    ).setOrigin(1, 1);
  }

  private updateTimer() {
    this.timeText.setText(`Time: ${formatTime(this.timeRemaining)}`);
  }

  private handleCellSelected(cell: Cell) {
    console.log('cellSelected', cell);
  }
}

export default UI;
