export class Interactive {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        setTimeout(() => {
            window.addEventListener("resize", this.resize.bind(this), false);
            this.resize();
            this.init?.();

            requestAnimationFrame(this.animate.bind(this));
        }, 0);
    }

    /**
     * resize가 일어나고, requestAnimationFrame가 실행되기 이전에 초기화 코드
     */
    init() {}

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }

    animate(t) {
        requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    }
}
