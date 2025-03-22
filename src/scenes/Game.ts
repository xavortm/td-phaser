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
    // Launch UI scene
    this.scene.launch('UI', UI);
  }
}
