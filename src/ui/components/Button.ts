import { Scene } from 'phaser';
import { uiColors } from '@config/ui';

/**
 * A button component that can be used to create a button in a Phaser scene.
 *
 * @example
 * const button = new Button(scene, 100, 100, 'Click me');
 * button.onClick(() => console.log('Button clicked'));
 */
export class Button extends Phaser.GameObjects.Container {
  private text: Phaser.GameObjects.Text;
  private background: Phaser.GameObjects.Rectangle;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    text: string,
    style: Phaser.Types.GameObjects.Text.TextStyle = {}
  ) {
    super(scene, x, y);

    // Create background
    this.background = scene.add.rectangle(
      0,
      0,
      120,
      40,
      Number(uiColors.background.replace('#', '0x'))
    );
    this.background.setStrokeStyle(2, Number(uiColors.foreground.replace('#', '0x')));
    this.background.setInteractive({ useHandCursor: true });

    // Create text
    this.text = scene.add.text(0, 0, text, {
      color: uiColors.foreground,
      fontSize: '16px',
      ...style,
    });
    this.text.setOrigin(0.5);

    // Add both to container
    this.add([this.background, this.text]);

    // Setup events
    this.background.on('pointerover', this.onPointerOver, this);
    this.background.on('pointerout', this.onPointerOut, this);

    // Add to scene
    scene.add.existing(this);
  }

  private onPointerOver(): void {
    this.background.setFillStyle(Number(uiColors.foreground.replace('#', '0x')));
    this.text.setStyle({ color: uiColors.background });
  }

  private onPointerOut(): void {
    this.background.setFillStyle(Number(uiColors.background.replace('#', '0x')));
    this.text.setStyle({ color: uiColors.foreground });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onClick(callback: Function, context?: any): this {
    this.background.on('pointerdown', callback, context);
    return this;
  }

  public setStyle(style: Phaser.Types.GameObjects.Text.TextStyle): this {
    this.text.setStyle(style);
    return this;
  }

  public setText(text: string): this {
    this.text.setText(text);
    return this;
  }
}
