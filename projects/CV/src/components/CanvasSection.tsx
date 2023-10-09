import { useEffect, useState } from 'react';

import { Ball } from '../utils/ball';

function CanvasSection() {
    const [canvasEl, setCanvasEl] = useState<HTMLCanvasElement | null>(null);
    const getRandom = () => {
        const a = Math.floor(Math.random() * 8) + 6;
        console.log(a);
        return a;
    };
    useEffect(() => {
        if (canvasEl) {
            const { height, width } = canvasEl.getBoundingClientRect();
            const ctx = canvasEl.getContext('2d');
            const { devicePixelRatio: ratio = 1 } = window;
            canvasEl.width = width * ratio;
            canvasEl.height = height * ratio;
            ctx?.scale(ratio, ratio);
            const balls = [
                new Ball(canvasEl.width, canvasEl.height, 6, getRandom()),
                new Ball(canvasEl.width, canvasEl.height, 6, getRandom(), 'red'),
                new Ball(canvasEl.width, canvasEl.height, 6, getRandom(), 'green'),
                new Ball(canvasEl.width, canvasEl.height, 6, getRandom(), 'blue'),
                new Ball(canvasEl.width, canvasEl.height, 6, getRandom()),
                new Ball(canvasEl.width, canvasEl.height, 6, getRandom(), 'red'),
                new Ball(canvasEl.width, canvasEl.height, 6, getRandom(), 'green'),
                new Ball(canvasEl.width, canvasEl.height, 6, getRandom(), 'blue'),
            ];

            const handleAnimate = () => {
                requestAnimationFrame(handleAnimate);
                if (ctx) {
                    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
                    balls.forEach((ball) => {
                        ball.draw(ctx, canvasEl.width, canvasEl.height);
                    });
                }
            };
            requestAnimationFrame(handleAnimate);
        }
    }, [canvasEl]);

    return <canvas ref={(r) => setCanvasEl(r)} style={{ height: '10rem', width: '100%' }} />;
}
export default CanvasSection;
