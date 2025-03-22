import { Scene } from 'phaser';
import { Button } from '@ui/components/Button';
import { Heading } from '@ui/components/Heading';
import Label from '@/ui/components/Label';

export class MainMenu extends Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    // Create a heading
    const title = new Heading(this, 512, 200, 'Main Menu').setLevel(1);

    // Create buttons
    const playButton = new Button(this, 512, 300, 'Play Game').onClick(() => this.startGame());

    const optionsButton = new Button(this, 512, 380, 'Options').onClick(() =>
      console.log('Options clicked')
    );

    const versionLabel = new Label(
      this,
      Number(this.game.config.width) - 20,
      Number(this.game.config.height) - 20,
      'v0.0.1, built by @xavortm',
      {
        fontSize: 10,
      }
    ).setOrigin(1, 1);

    // Scene-level events
    this.events.on('shutdown', () => {
      playButton.removeAllListeners();
      optionsButton.removeAllListeners();
    });

    // Alternative input
    this.input.keyboard?.on('keydown-SPACE', () => {
      this.startGame();
    });
  }

  private startGame(): void {
    this.scene.start('Game');
  }
}
