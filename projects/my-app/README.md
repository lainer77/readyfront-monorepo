# my-app

@common/components @common/utils
내부 라이브러리 설치 가능한지 테스트용 프로젝트

```bash
yarn create react-app packages/react-app --template typescript
yarn add @common/components @common/utils # pnp모드에서만 가능
```

<!-- ISSEU -->
> nodeLinker: pnpm 전환 후 Cannot read properties of null (reading 'useState') error 발생 react-app-rewired 하여 postcss 제거 필요
