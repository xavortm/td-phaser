import { uiColors, uiTypography } from '@/config/ui';

class Label extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    style: Phaser.Types.GameObjects.Text.TextStyle = {}
  ) {
    super(scene, x, y, text, {
      fontSize: uiTypography.label.fontSize,
      color: uiColors.foreground,
      ...style,
    });

    // Adds the label to the scene and sets the origin to the center so we can move it around in an intuitive way.
    this.setOrigin(0.5);
    scene.add.existing(this);
  }
}

export default Label;
