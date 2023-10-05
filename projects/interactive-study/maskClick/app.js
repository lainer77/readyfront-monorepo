import { CanvasResize } from './canvasResize.js';

class App extends CanvasResize {
    constructor() {
        super();
        this.hiddenCanvas = document.createElement('canvas');
        this.hiddenCtx = this.hiddenCanvas.getContext('2d', { willReadFrequently: true });
        // 유저에게 보이지 않도록 추가하지 않음
        // document.body.appendChild(this.hiddenCanvas);

        // 이미지 로드
        this.img = new Image();
        this.mask = new Image();
        this.img.src = 'cat.jpg';
        this.mask.src = 'cat_mask.png';
        Promise.all([
            new Promise((resolve) => (this.img.onload = resolve)),
            new Promise((resolve) => (this.mask.onload = resolve)),
        ]).then(() => {
            this.isImageLoaded = true;
            this.drawScaledImage(this.img, this.ctx);
            this.drawScaledImage(this.mask, this.hiddenCtx);
        });
        // 캔버스가 클릭되었을때 마스크에서 클릭 위치에 색깔이 있는지 확인하는 부분
        this.canvas.addEventListener('click', (e) => {
            const x = e.offsetX * this.pixelRatio;
            const y = e.offsetY * this.pixelRatio;

            const pixel = this.hiddenCtx.getImageData(x, y, 1, 1).data;
            // 마스크 영역(값이 255)을 클릭하면 이벤트 처리
            if (pixel[0] === 255 || pixel[1] === 255 || pixel[2] === 255) {
                console.log('고양이 부분을 클릭했습니다.');
                // 원하는 이벤트나 함수를 여기서 실행
            }
        });
    }

    // 이미지 그리기 (scale 적용)
    drawScaledImage(img, context) {
        const canvas = this.canvas;
        const scale = Math.max(
            canvas.width / this.pixelRatio / img.width,
            canvas.height / this.pixelRatio / img.height,
        );
        const x = (canvas.width / this.pixelRatio - img.width * scale) / 2;
        const y = (canvas.height / this.pixelRatio - img.height * scale) / 2;
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    resize() {
        super.resize();
        this.hiddenCanvas.width = this.stageWidth * this.pixelRatio;
        this.hiddenCanvas.height = this.stageHeight * this.pixelRatio;
        this.hiddenCtx.scale(this.pixelRatio, this.pixelRatio);

        if (this.isImageLoaded) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.hiddenCtx.clearRect(0, 0, this.hiddenCanvas.width, this.hiddenCanvas.height);

            this.drawScaledImage(this.img, this.ctx);
            this.drawScaledImage(this.mask, this.hiddenCtx);
        }
    }
}

window.onload = () => {
    new App();
};
