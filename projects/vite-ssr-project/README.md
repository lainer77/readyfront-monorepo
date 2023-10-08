# vite-ssr-project

## server 구조

- src/
  - middleware/
    - index.ts
  - routes/
    - apiRoutes.ts
  - utils/
    - index.ts
  - aws/
    - s3.ts
  - app.ts
  - index.ts
  - root.ts
  - lambda.ts
  
참조

- [tailwindcss](https://tailwindcss.com/docs/guides/vite)
- [ssr styled-components](https://styled-components.com/docs/advanced#server-side-rendering)

스크립트 유의사항

- `yarn prod:lambda`: 실행 후 <http://localhost:3000> 접근시 쿠키 삭제 필요
