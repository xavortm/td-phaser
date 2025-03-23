import BaseEnemy from '@/entities/BaseEnemy';

class SoldierEnemy extends BaseEnemy {
  constructor(scene: Phaser.Scene, x: number, y: number, level: number) {
    super(scene, x, y);
    this.level = level;
    console.log('SoldierEnemy constructor', level);

    this.setTexture('soldier_enemy');
    this.setOrigin(0.5);
    this.setDepth(1);
    scene.add.existing(this);

    // TODO: Make this more dynamic.
    this.speed = 1 + (level - 1) * 0.5;
    this.health = 100 + (level - 1) * 5;
    this.shield = 10 + (level - 1) * 2;
    this.damage = 1 + (level - 1) * 0.5;
    this.reward = 10 + (level - 1) * 1;
  }

  update(): void {
    this.move();
  }

  die(): void {
    this.scene.add.tween({
      targets: this,
      alpha: { from: 1, to: 0 },
      duration: 1000,
      onComplete: () => {
        this.destroy();
      },
    });
  }

  revive(): void {
    this.scene.add.tween({
      targets: this,
      alpha: { from: 0, to: 1 },
      duration: 1000,
      onComplete: () => {
        this.revive();
      },
    });
  }

  getReward(): number {
    return Phaser.Math.Between(this.reward - 2, this.reward + 2);
  }

  move(): void {
    // TODO: Implement this by following the path.
    this.x += this.speed;
  }
}

export default SoldierEnemy;
