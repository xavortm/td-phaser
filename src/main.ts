import { Boot } from '@scenes/Boot';
import { Game as MainGame } from '@scenes/Game';
import { GameOver } from '@scenes/GameOver';
import { MainMenu } from '@scenes/MainMenu';
import { Preloader } from '@scenes/Preloader';
import { FontPlugin } from 'phaser-font-plugin';

import { Game } from 'phaser';
import type { Types } from 'phaser';
import UI from './scenes/UI';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  backgroundColor: '#000000',
  pixelArt: true,
  antialias: false,
  roundPixels: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  // UI scene is set to active: true in its constructor, which makes it always visible
  // This is intentional since we want the UI overlay to persist across scenes
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver, UI],
  plugins: {
    global: [
      {
        key: 'FontPlugin',
        plugin: FontPlugin,
        start: true,
      },
    ],
  },
};

export default new Game(config);
