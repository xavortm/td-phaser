import Label from '@/ui/components/Label';

class UI extends Phaser.Scene {
  constructor() {
    super({ key: 'UI', active: true });
  }

  create() {
    // Version label at the bottom right
    const versionLabel = new Label(
      this,
      Number(this.game.config.width) - 20,
      Number(this.game.config.height) - 20,
      'v0.0.1, built by @xavortm',
      {
        fontSize: 10,
      }
    ).setOrigin(1, 1);
  }
}

export default UI;
