import { Scene } from 'phaser';
import GridManager from './Grid';
import WaveManager from './Wave';
import Spawner from './Spawner';

/**
 * A class to manage the game state as a whole and work with other managers.
 */
export default class GameManager {
  private scene: Scene;
  private waveManager: WaveManager;
  private spawner: Spawner;
  private gridManager: GridManager;

  constructor(scene: Scene) {
    this.scene = scene;
    this.waveManager = new WaveManager(this);
    this.spawner = new Spawner(this);
    this.gridManager = new GridManager(this);

    // Initialize game state
    this.scene.data.set({
      currentWave: 0,
      score: 0,
      lives: 10,
      gold: 100,
    });

    // Setup data change listeners
    this.scene.data.events.on('changedata', this.handleDataChange, this);

    // The UI is ready, so we can create the path and set the spawn points
    this.scene.events.once('uiReady', () => {
      this.gridManager.createPath(1);
      this.spawner.setSpawnPoints(this.gridManager.getSpawnPoints());
    });
  }

  private handleDataChange(parent: any, key: string, value: any): void {
    // You can handle specific data changes here
    switch (key) {
      case 'currentWave':
        console.log(`Wave changed to ${value}`);
        break;
      case 'lives':
        if (value <= 0) {
          this.scene.events.emit('gameOver');
        }
        break;
    }
  }

  public getScene(): Scene {
    return this.scene;
  }

  public getData(): Phaser.Data.DataManager {
    return this.scene.data;
  }

  public getWaveManager(): WaveManager {
    return this.waveManager;
  }

  public getSpawner(): Spawner {
    return this.spawner;
  }

  public startNextWave(): void {
    const currentWave = this.scene.data.get('currentWave');
    this.scene.data.set('currentWave', currentWave + 1);
    this.waveManager.startWave();
    this.spawner.spawnEnemies();
  }
}
