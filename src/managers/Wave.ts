import GameManager from './Game';

/**
 * The Wave class is responsible for managing the wave of enemies that will attack
 * the player as well as the path they will take. It is what is created when the
 * player starts a new wave.
 *
 * This class does not interract with the scene directly?
 */
export default class WaveManager {
  private wave: number = 0;
  private gameManager: GameManager;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
  }

  public getWave(): number {
    return this.wave;
  }

  public startWave(wave: number = 1) {
    this.wave = wave;
  }
}
