/* eslint-disable @typescript-eslint/no-explicit-any */
export const imageCache = {
    __cache: {} as any,
    read(src: string): Promise<any> {
        const promise = new Promise((resolve, reject) => {
            if (!this.__cache[src]) {
                const link = document.createElement('link');
                link.rel = 'prefetch prerender';
                link.href = src;
                link.as = 'image';
                document.head.appendChild(link);
            }
            const loadImg = new Image();
            loadImg.src = src;
            if (src === '') {
                this.__cache[src] = true;
                resolve(src);
            } else if (this.__cache[src]) {
                resolve(src);
            } else
                loadImg.onload = () => {
                    this.__cache[src] = true;
                    resolve(src);
                };

            loadImg.onerror = (err) => reject(err);
        });
        return promise;
    },
};
