import Label from '@/ui/components/Label';
import { formatTime } from '@/utils/time';

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

  constructor() {
    super({ key: 'UI' });
  }

  create() {
    const width = Number(this.game.config.width);
    const height = Number(this.game.config.height);
    const offset = 10;

    // Create UI elements as class properties so we can update them
    this.setupGameContainer(width, height, offset);
    this.setupGameStateInfo(width, offset);
    this.setupTimer();
    this.setupVersionLabel(width, height);
  }

  private setupGameContainer(width: number, height: number, offset: number) {
    // A large rectangle to contain the game visually
    this.gameContainer = this.add
      .rectangle(offset, offset, width - offset * 2, height - offset * 2, 0x000000, 0)
      .setName('gameContainer');

    this.gameContainer.setOrigin(0, 0);
    this.gameContainer.setStrokeStyle(4, 0xffffff, 1);
  }

  private setupGameStateInfo(width: number, offset: number) {
    // Top info bar
    this.gameStateContainer = this.add.rectangle(offset, offset, width - offset * 2, 20);
    this.gameStateContainer.setOrigin(0, 0);
    this.gameStateContainer.setStrokeStyle(1, 0xffffff, 1);

    // Add text displays for game state
    this.scoreText = this.add.text(offset + 10, offset + 4, 'Score: 0', {
      fontSize: '12px',
    });

    this.timeText = this.add
      .text(width - offset - 10, offset + 4, `Time: ${formatTime(TIME_TO_COMPLETE)}`, {
        fontSize: '12px',
      })
      .setOrigin(1, 0);
  }

  private setupTimer() {
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

  private setupVersionLabel(width: number, height: number) {
    this.versionLabel = new Label(this, width - 20, height - 20, `${VERSION}, built by @xavortm`, {
      fontSize: 10,
    }).setOrigin(1, 1);
  }

  private updateTimer() {
    this.timeText.setText(`Time: ${formatTime(this.timeRemaining)}`);
  }
}

export default UI;
