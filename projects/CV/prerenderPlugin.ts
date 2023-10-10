// // prerender-plugin.ts
// import fs from 'fs';
// import path from 'path';
// import puppeteer from 'puppeteer';

// export default function Prerender(options: { routes: string[] }) {
//     return {
//         name: 'vite-plugin-prerender',
//         async writeBundle() {
//             const browser = await puppeteer.launch({
//                 headless: 'new',
//             });
//             const page = await browser.newPage();

//             for (const route of options.routes) {
//                 // localhost 서버를 띄우고 해당 포트 번호로 변경하세요.
//                 const url = `http://localhost:5000${route}`;
//                 await page.goto(url, {
//                     waitUntil: 'networkidle0',
//                 });

//                 const content = await page.content();
//                 const routePath = route === '/' ? '' : route;
//                 const filePath = path.resolve(`./dist${routePath}/index.html`);

//                 if (!fs.existsSync(path.dirname(filePath))) {
//                     fs.mkdirSync(path.dirname(filePath), { recursive: true });
//                 }

//                 fs.writeFileSync(filePath, content);
//             }

//             await browser.close();
//         },
//     };
// }
