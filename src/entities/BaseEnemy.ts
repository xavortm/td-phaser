export enum EnemyType {
  Soldier = 'soldier',
}

abstract class BaseEnemy extends Phaser.GameObjects.Sprite {
  protected level: number;
  protected health: number;
  protected speed: number;
  protected damage: number;
  protected reward: number;
  protected shield: number;
  protected isDead: boolean; // dead enemy can not be killed again
  protected isKilled: boolean; // killed can be resurrected
  protected hasResurrected: boolean; // has resurrected can not be killed again

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'enemy');
  }

  // Killed enemy can be resurrected but can not be killed again
  public kill(): void {
    if (this.hasResurrected) {
      this.destroy();
      return;
    }

    this.isKilled = true;
  }

  public destroy(): void {
    this.isDead = true;

    // Used to run animations:
    this.die();
    this.scene.events.emit('enemyKilled', this);
  }

  public resurrect(): void {
    if (this.isDead) {
      console.log('enemy is dead');
      return;
    }

    this.isKilled = false;
    this.hasResurrected = true;

    this.revive();
  }

  public takeDamage(damage: number): void {
    // Maybe move to a utility function?
    function flashDamage(sprite: Phaser.GameObjects.Sprite): void {
      sprite.setTint(0xffffff);
      sprite.scene.tweens.add({
        targets: sprite,
        alpha: { from: 1, to: 0.5 },
        duration: 50,
        yoyo: true,
        onComplete: () => {
          sprite.clearTint();
        },
      });
    }

    // If there is even 1 shield remaining, reduce the shield first and do not
    // reduce health.
    if (this.shield > 0) {
      this.shield -= damage;
      flashDamage(this);
      return;
    }

    this.health -= damage;
    flashDamage(this);

    if (this.health <= 0) {
      this.kill();
    }
  }

  abstract update(): void;

  abstract die(): void;

  abstract revive(): void;

  abstract getReward(): number;

  abstract move(): void;
}

export default BaseEnemy;
