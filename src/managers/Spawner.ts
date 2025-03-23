import SoldierEnemy from '@/entities/SoldierEnemy';
import GameManager from './Game';
import { EnemyType } from '@/entities/BaseEnemy';

interface EnemyToSpawn {
  enemyType: EnemyType;
  count: number;
  level: number;
}

// TODO: Move to config file.
const waves: {
  wave: number;
  enemies: EnemyToSpawn[];
  spawnTime: number;
}[] = [
  {
    wave: 1,
    enemies: [{ enemyType: EnemyType.Soldier, count: 1, level: 1 }],
    spawnTime: 1000,
  },
];

export default class Spawner {
  private gameManager: GameManager;
  private spawnPoints: Phaser.GameObjects.Rectangle[];
  private enemiesGroup: Phaser.GameObjects.Group;
  private spawnIndex: number;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
    this.spawnPoints = [];
    this.enemiesGroup = this.gameManager.getScene().add.group();
  }

  public spawnEnemies() {
    const scene = this.gameManager.getScene();
    const currentWave = scene.data.get('currentWave');

    scene.events.emit('spawningEnemies', currentWave);

    const waveToSpawn = waves.find((w) => w.wave === currentWave);
    if (!waveToSpawn) {
      return;
    }

    this.spawnIndex = 0;
    this.spawnNextEnemy(waveToSpawn);
  }

  private spawnNextEnemy(waveConfig: (typeof waves)[0]) {
    const scene = this.gameManager.getScene();

    if (this.spawnIndex >= waveConfig.enemies[0].count) {
      scene.events.emit('spawningEnemiesDone', waveConfig.wave);
      return;
    }

    // TODO: Spawn enemy based on waveConfig
    this.spawnIndex++;

    scene.time.delayedCall(waveConfig.spawnTime, () => {
      this.spawnNextEnemy(waveConfig);
    });
  }

  public getSpawnPoints(): Phaser.GameObjects.Rectangle[] {
    return this.spawnPoints;
  }

  public setSpawnPoints(spawnPoints: Phaser.GameObjects.Rectangle[]): void {
    this.spawnPoints = spawnPoints;
  }
}
