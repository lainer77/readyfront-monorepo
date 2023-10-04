import { Polygon } from "./polygon.js";
import { Interactive } from "./interactive.js";

class App extends Interactive {
    init() {
        this.isDown = false;
        this.moveX = 0;
        this.offsetX = 0;

        document.addEventListener("pointerdown", this.onDown.bind(this), false);
        document.addEventListener("pointermove", this.onMove.bind(this), false);
        document.addEventListener("pointerup", this.onUp.bind(this), false);
    }

    resize() {
        super.resize();

        // 도형 생성
        // this.polygon = new Polygon(
        //     this.stageWidth / 2,
        //     this.stageHeight / 2,
        //     this.stageHeight / 3,
        //     6 // 꼭지점
        // );
        this.polygon = new Polygon(
            this.stageWidth / 2,
            this.stageHeight + this.stageHeight / 4,
            this.stageHeight / 1.5,
            15
        );
    }

    animate(t) {
        super.animate(t);

        this.moveX *= 0.92;

        this.polygon.animate(this.ctx, this.moveX);
    }

    onDown(e) {
        this.isDown = true;
        this.moveX = 0;
        this.offsetX = e.clientX;
    }
    onMove(e) {
        if (this.isDown) {
            this.moveX = e.clientX - this.offsetX;
            this.offsetX = e.clientX;
        }
    }
    onUp(e) {
        this.isDown = false;
    }
}

window.onload = () => {
    new App();
};
