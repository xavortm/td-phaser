import { Scene } from 'phaser';

export class GameOver extends Scene {
  gameover_text: Phaser.GameObjects.Text;

  constructor() {
    super('GameOver');
  }

  create() {
    this.gameover_text = this.add.text(512, 384, 'Game Over', {
      fontFamily: 'pressStart2P',
      fontSize: 64,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
      align: 'center',
    });
    this.gameover_text.setOrigin(0.5);

    this.input.once('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }
}
