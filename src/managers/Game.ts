import WaveManager from '@/managers/Wave';

/**
 * A class to manage the game state as a whole and work with other managers.
 */
export default class GameManager {
  private scene: Phaser.Scene;
  private waveManager: WaveManager;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.waveManager = new WaveManager(this);

    // Listen for UI ready event
    this.scene.events.once('uiReady', () => {
      this.startWave(1);
    });
  }

  public startWave(wave: number): void {
    this.waveManager.startWave(wave);

    // Emit the event through the game scene
    this.scene.events.emit('waveStarted', wave);
  }
}
