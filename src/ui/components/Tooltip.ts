import { Scene } from 'phaser';
import { uiColors } from '@config/ui';

export default class Tooltip extends Phaser.GameObjects.Container {
  private background: Phaser.GameObjects.Rectangle;
  private content: Phaser.GameObjects.Text;
  private padding: number = 8;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);

    // Create background and content with initial empty state
    this.background = scene.add.rectangle(0, 0, 10, 10, 0x000000, 0.8);
    this.background.setStrokeStyle(1, Number(uiColors.foreground.replace('#', '0x')));
    this.background.setOrigin(0, 0);

    this.content = scene.add.text(this.padding, this.padding, '', {
      color: '#ffffff',
      fontSize: '12px',
      align: 'left',
      wordWrap: { width: 150 },
    });
    this.content.setOrigin(0, 0);

    // Add to container
    this.add([this.background, this.content]);

    // Add to scene but start invisible
    scene.add.existing(this);
    this.setVisible(false);

    // Set depth to appear above other elements
    this.setDepth(100);
  }

  // Show tooltip at position with content
  public show(x: number, y: number, content: string): void {
    // Update position
    this.x = x;
    this.y = y;

    // Update content
    this.content.setText(content);

    // Resize background to fit content
    const bounds = this.content.getBounds();
    this.background.width = bounds.width + this.padding * 2;
    this.background.height = bounds.height + this.padding * 2;

    // Check if tooltip would go off screen and adjust position if needed
    const gutter = 20;
    const rightEdge = this.x + this.background.width + gutter;
    const bottomEdge = this.y + this.background.height + gutter;
    const sceneWidth = this.scene.cameras.main.width;
    const sceneHeight = this.scene.cameras.main.height;

    if (rightEdge > sceneWidth) {
      this.x = sceneWidth - this.background.width - gutter;
    }

    if (bottomEdge > sceneHeight) {
      this.y = sceneHeight - this.background.height - gutter;
    }

    // Make visible
    this.setVisible(true);
  }

  // Hide the tooltip
  public hide(): void {
    this.setVisible(false);
  }
}
