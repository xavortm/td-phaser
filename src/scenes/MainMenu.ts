import { Scene } from 'phaser';
import { uiTypography } from '@config/uiTypography';
import Heading from '@/ui/components/Heading';

export class MainMenu extends Scene {
  title: Heading;

  constructor() {
    super('MainMenu');
  }

  create() {
    this.title = this.add.existing(
      new Heading(this, 512, 384, 'Main Menu', {
        ...uiTypography.style.base,
        ...uiTypography.gameTitle,
        align: 'center',
      })
    ) as Heading;

    this.title.setOrigin(0.5);
  }
}
