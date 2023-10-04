import { Interactive } from "./interactive.js";

class App extends Interactive {
    constructor() {
        super();
        // 초기화 코드
    }

    /**
     * resize가 일어나고, requestAnimationFrame가 실행되기 이전에 초기화 코드
     */
    init() {}

    resize() {
        super.resize();
    }

    animate(t) {
        super.animate(t);
    }
}

window.onload = () => {
    new App();
};
