import { Scene } from 'phaser';
import GridManager from './Grid';
import WaveManager from './Wave';
import Spawner from './Spawner';

export default class GameManager {
  private scene: Scene;
  private waveManager: WaveManager;
  private gridManager: GridManager;
  private spawner: Spawner;

  constructor(scene: Scene) {
    this.scene = scene;
    this.waveManager = new WaveManager(this);
    this.gridManager = new GridManager(this);
    this.spawner = new Spawner(this);

    // Initialize game state
    this.scene.data.set({
      currentWave: 0,
      score: 0,
      lives: 10,
      xp: 0,
      level: 1,
    });

    // Setup data change listeners
    this.scene.data.events.on('changedata', this.handleDataChange, this);

    // The UI is ready, so we can create the path and set the spawn points
    this.scene.events.once('uiReady', () => {
      this.gridManager.createPath(1);
      this.spawner.setSpawnPoints(this.gridManager.getSpawnPoints());
      this.startNextWave();
    });
  }

  private handleDataChange(parent: any, key: string, value: any): void {
    console.log(`Data changed: ${key} to ${value}`);
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
