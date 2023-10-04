import { SheepController } from '../sheepController.js';
import { Sun } from '../sun.js';
import { Hill } from './hill.js';
import { Interactive } from './interactive.js';

class App extends Interactive {
    constructor() {
        super();

        this.hills = [
            new Hill('#fd6bea', 0.2, 12),
            new Hill('#ff59c2', 0.5, 8),
            new Hill('#ff4674', 1.4, 6),
        ];

        this.sheepController = new SheepController();
        this.suns = [new Sun(200, 10, '#ffb200')];
    }

    animate(t) {
        super.animate(t);

        for (let i = 0; i < this.suns.length; i++) {
            this.suns[i].draw(this.ctx, t);
        }

        let dots;
        for (let i = 0; i < this.hills.length; i++) {
            dots = this.hills[i].draw(this.ctx);
        }

        this.sheepController.draw(this.ctx, t, dots);
    }

    resize() {
        super.resize();

        for (let i = 0; i < this.suns.length; i++) {
            this.suns[i].resize(this.stageWidth, this.stageHeight);
        }

        for (let i = 0; i < this.hills.length; i++) {
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }

        this.sheepController.resize(this.stageWidth, this.stageHeight);
    }
}

window.onload = () => {
    new App();
};
