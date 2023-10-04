import { Ball } from './ball.js';
import { Block } from './block.js';
import { Interactive } from './interactive.js';

class App extends Interactive {
    animate(t) {
        super.animate(t);
        this.block.draw(this.ctx);
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
    }

    init() {
        this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 15);
        this.block = new Block(700, 30, 300, 450);
    }
}

window.onload = () => {
    new App();
};
