// src/main.js
import Phaser from 'phaser';
import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { MainMenu } from './scenes/MainMenu';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { DRAG_THRESHOLD } from './constants'; // Import if needed for config

const config = {
    type: Phaser.AUTO, // AUTO selects WebGL if available, otherwise Canvas
    parent: 'game-container', // Matches the div id in index.html
    backgroundColor: '#1a1a2e', // Dark blue/purple background
    scale: {
        mode: Phaser.Scale.RESIZE, // Adjust game size to fit window/container
        parent: 'game-container',
        width: '100%',
        height: '100%',
        autoCenter: Phaser.Scale.CENTER_BOTH, // Center the canvas
        autoRound: true, // Round pixel values for potentially crisper rendering
    },
    // Physics not strictly needed for this game type, can be removed if unused
    // physics: {
    //     default: 'arcade',
    //     arcade: { gravity: { y: 0 } }
    // },
    input: {
        activePointers: 1, // Allow only one active touch/mouse pointer
        touch: {
            capture: true, // Prevent default touch actions (like scroll) on the canvas
             // dragThreshold: DRAG_THRESHOLD // Set directly in Game scene logic now
        }
    },
    render: {
        antialias: true, // Smoother edges for non-pixel art
        pixelArt: false, // Set to true if using pixel art assets and want sharp scaling
        roundPixels: true // Helps prevent sub-pixel jitter
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,       // The main game controller scene
        GameOver
    ]
};

// Create and export the game instance
const game = new Phaser.Game(config);
export default game;