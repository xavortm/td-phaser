import WaveManager from '@/managers/Wave';
import GridManager from '@/managers/Grid';
import Spawner from './Spawner';

/**
 * A class to manage the game state as a whole and work with other managers.
 */
export default class GameManager {
  private scene: Phaser.Scene;
  private waveManager: WaveManager;
  private gridManager: GridManager;
  private spawner: Spawner;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.waveManager = new WaveManager(this);
    this.gridManager = new GridManager(this);
    this.spawner = new Spawner(this);

    this.scene.events.once('uiReady', () => {
      this.startWave(1);
      this.gridManager.createPath(1);
      this.spawner.setSpawnPoints(this.gridManager.getSpawnPoints());
    });
  }

  public startWave(wave: number): void {
    this.waveManager.startWave(wave);
    this.spawner.spawnEnemies(wave);

    // Emit the event through the game scene
    this.scene.events.emit('waveStarted', wave);
  }

  public getScene(): Phaser.Scene {
    return this.scene;
  }
}
