import { Scene } from 'phaser';
import Cell from '@/entities/Cell';
import GameManager from '@/managers/Game';

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

  create() {
    this.gameManager = new GameManager(this);
    this.scene.launch('UI');

    // Keep at the end.
    this.events.emit('gameReady');
  }
}
