import { Scene } from 'phaser';
import Tooltip from '@/ui/components/Tooltip';

export default class TooltipManager {
  private scene: Scene;
  private tooltip: Tooltip;
  private activeObject: Phaser.GameObjects.GameObject | null = null;

  constructor(scene: Scene) {
    this.scene = scene;
    this.tooltip = new Tooltip(scene, 0, 0);
  }

  /**
   * Show a tooltip at a specific position with the given content
   */
  public showTooltip(x: number, y: number, content: string): void {
    // Position with slight offset to not obscure what was hovered
    this.tooltip.show(x + 15, y - 15, content);
  }

  /**
   * Hide the current tooltip
   */
  public hideTooltip(): void {
    this.tooltip.hide();
    this.activeObject = null;
  }

  /**
   * Register hover handlers for any interactive game object
   */
  public registerTooltipForObject(
    object: Phaser.GameObjects.GameObject,
    contentProvider: () => string
  ): void {
    // Show tooltip on hover
    object.on('pointerover', (pointer: Phaser.Input.Pointer) => {
      this.activeObject = object;
      this.showTooltip(pointer.worldX, pointer.worldY, contentProvider());
    });

    // Hide tooltip when pointer leaves object
    object.on('pointerout', () => {
      if (this.activeObject === object) {
        this.hideTooltip();
      }
    });

    // Update tooltip position on pointer move while hovering
    object.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.activeObject === object) {
        this.showTooltip(pointer.worldX, pointer.worldY, contentProvider());
      }
    });
  }
}
