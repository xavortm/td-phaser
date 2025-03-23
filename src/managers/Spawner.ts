import GameManager from './Game';

interface EnemyToSpawn {
  enemyType: string;
  count: number;
  level: number;
}

const waves: {
  wave: number;
  enemies: EnemyToSpawn[];
  spawnTime: number;
}[] = [
  {
    wave: 1,
    enemies: [{ enemyType: 'enemy1', count: 1, level: 1 }],
    spawnTime: 1000,
  },
];

export default class Spawner {
  private gameManager: GameManager;
  private spawnPoints: Phaser.GameObjects.Rectangle[];

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
    this.spawnPoints = [];
  }

  // enemyType will be enum from EnemyBase.
  // TODO: Implement this.
  public spawnEnemies(wave: number) {
    this.gameManager.getScene().events.emit('spawningEnemies', wave);

    console.log('spawning enemies in wave', wave);
    const waveToSpawn = waves.find((w) => w.wave === wave);
    if (!waveToSpawn) {
      console.log('no wave found');
      return;
    }

    // TODO: Implement this.
    setTimeout(() => {
      this.gameManager.getScene().events.emit('spawningEnemiesDone', wave);
      console.log('spawning enemies done in wave', wave);
    }, waveToSpawn.spawnTime);
  }

  public getSpawnPoints(): Phaser.GameObjects.Rectangle[] {
    return this.spawnPoints;
  }

  public setSpawnPoints(spawnPoints: Phaser.GameObjects.Rectangle[]): void {
    this.spawnPoints = spawnPoints;
  }
}
