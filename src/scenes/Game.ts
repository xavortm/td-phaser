import { Scene } from 'phaser';
import UI from '@/scenes/UI';

// The game will be a single scene that the player has to complete for give time.
// There are no levels. Works like Belatro in a way.

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;

  constructor() {
    super('Game');
  }

  create() {
    const width = Number(this.game.config.width);
    const height = Number(this.game.config.height);
    const offset = 10;

    const rectangle = this.add.rectangle(
      offset,
      offset,
      width - offset * 2,
      height - offset * 2,
      0x000000,
      1
    );
    rectangle.setOrigin(0, 0);
    rectangle.setStrokeStyle(4, 0xffffff, 1);

    // Launch UI scene
    this.scene.launch('UI', UI);
  }
}
