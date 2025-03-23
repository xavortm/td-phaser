# Tower Defense Game

A modern tower defense game built with Phaser 3 and TypeScript.

## Features

- Grid-based gameplay with interactive cells
- Wave-based enemy system
- Tower placement and management
- Scene management for UI and gameplay
- Event-driven architecture

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── scenes/         # Game scenes (Game, UI)
├── entities/       # Game objects (Cell, Tower, Enemy)
├── managers/       # Game logic (GameManager, WaveManager)
├── ui/            # UI components
└── config/        # Game configuration
```

## Tech Stack

- Phaser 3
- TypeScript
- Vite
- ESLint + Prettier

## Development

The game uses a modular architecture with:

- Scene-based organization
- Event-driven communication
- Manager classes for game logic
- Reusable UI components

## License

MIT
