import { Scene } from 'phaser';

export class Heading extends Phaser.GameObjects.Text {
  constructor(
    scene: Scene,
    x: number,
    y: number,
    text: string,
    style: Phaser.Types.GameObjects.Text.TextStyle = {}
  ) {
    super(scene, x, y, text, {
      fontSize: '32px',
      color: '#ffffff',
      align: 'center',
      ...style,
    });

    this.setOrigin(0.5);
    scene.add.existing(this);
  }

  makeInteractive(): this {
    this.setInteractive({ useHandCursor: true });

    this.on('pointerover', () => {
      this.setStyle({ color: '#ffff00' });
    });

    this.on('pointerout', () => {
      this.setStyle({ color: '#ffffff' });
    });

    return this;
  }

  setLevel(level: number): this {
    switch (level) {
      case 1:
        this.setFontSize('48px');
        break;
      case 2:
        this.setFontSize('32px');
        break;
      case 3:
        this.setFontSize('24px');
        break;
    }
    return this;
  }
}
