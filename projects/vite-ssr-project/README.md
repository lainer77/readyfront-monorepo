# **vite-ssr-project**

## **프로젝트 개요**

이 프로젝트는 Vite와 SSR(Server Side Rendering)를 사용하여 구축되었습니다. AWS Lambda를 통해 배포되며, TypeScript와 여러 라이브러리 및 플러그인과 함께 작업됩니다.

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

## **프로젝트 설정**

### **초기 설정**

1. **패키지 매니저**: `yarn@3.6.0`을 사용하므로, 종속성을 설치할 때 `yarn install`을 사용하세요.
2. **TypeScript**: 프로젝트는 TypeScript 기반입니다. `tsconfig.json`을 참조하여 타입 관련 설정을 확인하거나 수정할 수 있습니다.

### **스크립트**

- **개발 모드**: **`yarn dev`**
- **프로덕션 빌드 및 실행**: **`yarn prod`**
- **배포**: **`yarn deploy`**
- **Lint**: **`yarn lint`**

### **서버리스 배포**

프로젝트는 Serverless Framework를 사용하여 AWS Lambda에 배포됩니다.

- **Region**: **`ap-northeast-2`**
- **Runtime**: **`nodejs18.x`**

배포 관련 설정은 **`serverless.yml`**에서 확인할 수 있습니다.

## **의존성 및 라이브러리**

1. **스타일링**: **`tailwindcss`**, **`styled-components`**, `sass`를 사용합니다.
2. **라우팅 및 SSR**: **`vite-plugin-ssr`** 및 `react-router-dom`을 사용합니다.
3. **상태 관리**: `recoil`을 사용합니다.
4. **서버 설정**: `express`와 관련 라이브러리를 사용하여 서버를 설정합니다. `serverless-http`로 AWS Lambda와 통합됩니다.

## **참조**

- [vite-plugin-ssr](https://vite-plugin-ssr.com/)
- [TailwindCSS with Vite](https://tailwindcss.com/docs/guides/vite)
- [SSR with Styled-components](https://styled-components.com/docs/advanced#server-side-rendering)

## **주의 사항**

**`yarn prod:lambda`** 실행 후 [http://localhost:3000](http://localhost:3000/)에 접근할 때는 쿠키를 삭제해야 합니다.
