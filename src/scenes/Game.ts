import { Scene } from 'phaser';
import Cell from '@/entities/Cell';
import GameManager from '@/managers/Game';
import BaseEnemy from '@/entities/BaseEnemy';

// The game will be a single scene that the player has to complete for give time.
// There are no levels. Works like Belatro in a way.

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  msg_text: Phaser.GameObjects.Text;
  private gameManager: GameManager;

  constructor() {
    super('Game');
  }

  preload() {
    this.textureEnemySoldier();
  }

  create() {
    this.gameManager = new GameManager(this);
    this.scene.launch('UI');

    // Keep at the end.
    this.events.emit('gameReady');
  }

  update() {
    // Update all enemies in the spawner's group
    this.gameManager
      .getSpawner()
      .getEnemiesGroup()
      .getChildren()
      .forEach((enemy) => {
        (enemy as BaseEnemy).update();
      });
  }

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
