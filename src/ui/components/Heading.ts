import { uiTypography } from '@/config/uiTypography';

class Heading extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    style: Phaser.Types.GameObjects.Text.TextStyle,
    level: number = 1 | 2
  ) {
    super(scene, x, y, text, style);
    this.setOrigin(0.5);

    this.setStyle({
      ...uiTypography.style.base,
      ...uiTypography.heading[level - 1],

      // Override the default style
      ...style,
    });
  }
}

export default Heading;
