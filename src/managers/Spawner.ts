import SoldierEnemy from '@/entities/SoldierEnemy';
import GameManager from './Game';
import { EnemyType } from '@/entities/BaseEnemy';

interface EnemyToSpawn {
  enemyType: EnemyType;
  count: number;
  level: number;
}

interface Wave {
  wave: number;
  enemies: EnemyToSpawn[];
  spawnTime: number;
}

// TODO: Move to config file.
const waves: Wave[] = [
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

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
    this.spawnPoints = [];
    this.enemiesGroup = this.gameManager.getScene().add.group();
  }

  public getEnemiesGroup(): Phaser.GameObjects.Group {
    return this.enemiesGroup;
  }

  public spawnEnemies() {
    const scene = this.gameManager.getScene();
    const currentWave = scene.data.get('currentWave');

    scene.events.emit('spawningEnemies', currentWave);

    const waveToSpawn = waves.find((w) => w.wave === currentWave);
    if (!waveToSpawn) {
      console.error('No wave to spawn', currentWave);
      return;
    }

    const flattenedEnemies = this.flattenEnemies(waveToSpawn);
    const spawnPoint = this.spawnPoints[Phaser.Math.Between(0, this.spawnPoints.length - 1)];

    flattenedEnemies.forEach((enemyType) => {
      switch (enemyType) {
        case EnemyType.Soldier: {
          // Why 100? To fix.
          const enemy = new SoldierEnemy(scene, spawnPoint.x, spawnPoint.y + 100, 1);
          this.enemiesGroup.add(enemy);
          console.log('enemy', enemy);
          break;
        }
      }
    });

    scene.events.emit('spawningEnemiesDone', currentWave);
  }

  public getSpawnPoints(): Phaser.GameObjects.Rectangle[] {
    return this.spawnPoints;
  }

  public setSpawnPoints(spawnPoints: Phaser.GameObjects.Rectangle[]): void {
    console.log('setSpawnPoints', spawnPoints);
    this.spawnPoints = spawnPoints;
  }

  private flattenEnemies(waveConfig: (typeof waves)[0]): EnemyType[] {
    const flattenedEnemies: EnemyType[] = [];

    waveConfig.enemies.forEach((enemy) => {
      flattenedEnemies.push(...Array(enemy.count).fill(enemy.enemyType));
    });

    return flattenedEnemies;
  }
}
