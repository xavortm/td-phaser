abstract class BaseTower extends Phaser.GameObjects.Sprite {
  protected level: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'tower');
    this.scene = scene;
  }

  create(): void {
    console.log('BaseTower created');
    console.log(this.scene);
  }
}

export default BaseTower;
