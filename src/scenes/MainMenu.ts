import { Scene } from 'phaser';
import { Button } from '@ui/components/Button';
import { Heading } from '@ui/components/Heading';

export class MainMenu extends Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    // Create a heading
    const title = new Heading(this, 512, 200, 'Main Menu').setLevel(1).makeInteractive();

    // Create buttons
    const playButton = new Button(this, 512, 300, 'Play Game').onClick(() => this.startGame());

    const optionsButton = new Button(this, 512, 380, 'Options').onClick(() =>
      console.log('Options clicked')
    );

    // Scene-level events
    this.events.on('shutdown', () => {
      title.removeAllListeners();
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
