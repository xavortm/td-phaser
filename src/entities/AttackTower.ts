import BaseTower from "./BaseTower";

class AttackTower extends BaseTower {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.level = 1;
    console.log('from tower: ', x, y);

    console.log('SoldierEnemy constructor', this.level);
  }
}

export default AttackTower;
