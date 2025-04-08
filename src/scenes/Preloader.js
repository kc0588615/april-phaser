// src/scenes/Preloader.js
import Phaser from 'phaser';
import { GEM_TYPES, ASSETS_PATH, AssetKeys, GEM_FRAME_COUNT } from '../constants';

export class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        this.showLoadingProgress();

        // Load common assets
        this.load.image(AssetKeys.LOGO, `${ASSETS_PATH}logo.png`);
        this.load.image(AssetKeys.BACKGROUND, `${ASSETS_PATH}background.png`);

        // Load Gem Assets
        GEM_TYPES.forEach(type => {
            for (let i = 0; i < GEM_FRAME_COUNT; i++) {
                const key = AssetKeys.GEM_TEXTURE(type, i);
                const path = `${ASSETS_PATH}${type}_gem_${i}.png`;
                this.load.image(key, path);
            }
        });

        // Load sounds if/when added
        // this.load.audio(AssetKeys.SOUND_MATCH, [`${ASSETS_PATH}sounds/match.ogg`, `${ASSETS_PATH}sounds/match.mp3`]);
    }

    showLoadingProgress() {
        const { width, height } = this.cameras.main;
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x333333, 0.8); // Darker gray
        progressBox.fillRect(width * 0.2, height * 0.5 - 25, width * 0.6, 50);

        const loadingText = this.make.text({
            x: width / 2, y: height / 2 - 50, text: 'Loading...',
            style: { font: '24px Arial', color: '#ffffff' }
        }).setOrigin(0.5);

        const percentText = this.make.text({
            x: width / 2, y: height / 2, text: '0%',
            style: { font: '20px Arial', color: '#ffffff' }
        }).setOrigin(0.5);

        const assetText = this.make.text({
            x: width / 2, y: height / 2 + 50, text: '',
            style: { font: '16px Arial', color: '#dddddd' }
        }).setOrigin(0.5);

        this.load.on('progress', (value) => {
            percentText.setText(`${parseInt(value * 100)}%`);
            progressBar.clear();
            progressBar.fillStyle(0xeeeeee, 1); // Lighter gray bar
            progressBar.fillRect(width * 0.2 + 10, height * 0.5 - 15, (width * 0.6 - 20) * value, 30);
        });

        this.load.on('fileprogress', (file) => {
            // Limit asset text length
            const keyName = file.key.length > 30 ? file.key.substring(0, 27) + '...' : file.key;
             assetText.setText(`Loading: ${keyName}`);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            console.log("Preloader complete.");
        });
    }

    create() {
        console.log("Preloader: Starting MainMenu");
        this.scene.start('MainMenu');
    }
}