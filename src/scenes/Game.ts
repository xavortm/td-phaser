import { Scene } from 'phaser';
import GameManager from '@/managers/Game';

// The game will be a single scene that the player has to complete for give time.
// There are no levels. Works like Belatro in a way.

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;

  constructor() {
    super('Game');
  }

  preload() {
    this.textureEnemySoldier();
  }

  create() {
    // All the game logic:
    new GameManager(this);

    this.scene.launch('UI');

    this.events.emit('gameReady');

    // Add click event to log coordinates
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      console.log(`
        Clicked at: 
        - Screen: x=${pointer.x}, y=${pointer.y}
      `);
    });
  }

  // Maybe this is the wrong place to add this code?
  update() { }

  // To be updated of course.
  private textureEnemySoldier() {
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0x000000);
    graphics.fillStyle(0xffff00, 1);
    graphics.fillCircle(8, 8, 8);
    graphics.strokeCircle(8, 8, 7);
    graphics.generateTexture('soldier_enemy', 16, 16);
    graphics.destroy();
  }
}
