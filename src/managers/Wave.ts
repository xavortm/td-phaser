import GameManager from './Game';

/**
 * The Wave class is responsible for managing the wave of enemies that will attack
 * the player as well as the path they will take. It is what is created when the
 * player starts a new wave.
 *
 * This class does not interract with the scene directly?
 */
export default class WaveManager {
  private gameManager: GameManager;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
  }

  public startWave(): void {
    const scene = this.gameManager.getScene();
    const currentWave = scene.data.get('currentWave');

    // Emit wave start event
    scene.events.emit('waveStarted', currentWave);

    // Set up wave completion check
    scene.events.once('spawningEnemiesDone', () => {
      this.checkWaveCompletion();
    });
  }

  private checkWaveCompletion(): void {
    const scene = this.gameManager.getScene();
    const currentWave = scene.data.get('currentWave');

    // When all enemies are dead/reached end
    if (this.areAllEnemiesDefeated()) {
      scene.events.emit('waveCompleted', currentWave);

      // Add rewards
      scene.data.values.score += 100 * currentWave;
      scene.data.values.gold += 50 * currentWave;
    }
  }

  private areAllEnemiesDefeated(): boolean {
    // TODO: Implement check for remaining enemies
    return true;
  }
}
