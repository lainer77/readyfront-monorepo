import { Point } from "./point.js";
import { Dialog } from "./dialog.js";
import { Interactive } from "../interactive.js";

class App extends Interactive {
    constructor() {
        super();

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.mousePos = new Point();
        this.curItem = null;

        this.items = [];
        this.total = 5;
        for (let i = 0; i < this.total; i++) {
            this.items[i] = new Dialog(i);
        }

        document.addEventListener("pointerdown", this.onDown.bind(this), false);
        document.addEventListener("pointermove", this.onMove.bind(this), false);
        document.addEventListener("pointerup", this.onUp.bind(this), false);
    }

    resize() {
        super.resize();

        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 3;
        this.ctx.shadowBlur = 6;
        this.ctx.shadowColor = `rgba(0, 0, 0, 0.1)`;

        this.ctx.lineWidth = 2;

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].resize(this.stageWidth, this.stageHeight);
        }
    }

    animate() {
        super.animate();

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].animate(this.ctx);
        }

        if (this.curItem) {
            this.ctx.fillStyle = "#ff4338";
            this.ctx.strokeStyle = "#ff4338";

            this.ctx.beginPath();
            this.ctx.arc(this.mousePos.x, this.mousePos.y, 8, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.arc(
                this.curItem.centerPos.x,
                this.curItem.centerPos.y,
                8,
                0,
                Math.PI * 2
            );
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.moveTo(this.mousePos.x, this.mousePos.y);
            this.ctx.lineTo(this.curItem.centerPos.x, this.curItem.centerPos.y);
            this.ctx.stroke();
        }
    }

    onDown(e) {
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;

        for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i].down(this.mousePos.clone());
            if (item) {
                this.curItem = item;
                const index = this.items.indexOf(item);
                this.items.push(this.items.splice(index, 1)[0]);
                break;
            }
        }
    }
    onMove(e) {
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;

        for (let i = this.items.length - 1; i >= 0; i--) {
            this.items[i].move(this.mousePos.clone());
        }
    }
    onUp(e) {
        this.curItem = null;

        for (let i = this.items.length - 1; i >= 0; i--) {
            this.items[i].up();
        }
    }
}

window.onload = () => {
    new App();
};
