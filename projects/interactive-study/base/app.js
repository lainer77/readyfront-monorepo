import { Interactive } from './interactive.js';

class App extends Interactive {
    constructor() {
        super();
        // 초기화 코드
    }

    animate(t) {
        super.animate();
    }

    /**
     * resize가 일어나고, requestAnimationFrame가 실행되기 이전에 초기화 코드
     */
    init() {
        //
    }

    resize() {
        super.resize();
    }
}

window.onload = () => {
    new App();
};
