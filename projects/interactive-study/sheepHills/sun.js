export class Sun {
    constructor(radius, vi, color) {
        this.radius = radius;
        this.vi = vi;
        this.color = color;

        this.total = 60;
        this.gap = 1 / this.total;
        this.originPos = [];
        this.pos = [];
        for (let i = 0; i < this.total; i++) {
            const pos = this.getCirclePoint(this.radius, this.gap * i);
            this.originPos[i] = pos;
            this.pos[i] = pos;
        }

        this.fps = 30;
        this.fpsTime = 1000 / this.fps;
    }

    draw(ctx, t) {
        if (!this.time) this.time = t;
        const now = t - this.time;
        if (now > this.fpsTime) {
            this.item = t;
            this.updatePoints();
        }
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // 원 그리기
        // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        // 지글거리는 원 그리기
        let pos = this.pos[0];
        ctx.moveTo(pos.x + this.x, pos.y + this.y);
        for (let i = 1; i < this.total; i++) {
            pos = this.pos[i];
            ctx.lineTo(pos.x + this.x, pos.y + this.y);
        }
        ctx.fill();
    }

    getCirclePoint(radius, t) {
        const theta = Math.PI * 2 * t;

        return { x: Math.cos(theta) * radius, y: Math.sin(theta) * radius };
    }

    ranInt(max) {
        return Math.random() * max;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.x = this.stageWidth - (this.stageHeight / 10) * 3;
        this.y = (this.stageHeight / 10) * 3;
    }

    updatePoints() {
        for (let i = 1; i < this.total; i++) {
            const pos = this.originPos[i];
            this.pos[i] = {
                x: pos.x + this.ranInt(this.vi),
                y: pos.y + this.ranInt(this.vi),
            };
        }
    }
}
