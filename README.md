# monorepo-boilerplate

> v18.15.*

## direnv

``` zsh
brew install direnv
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc
```

프로젝트 루트에서 direnv allow 명령어를 실행하여 .envrc 설정을 승인

``` zsh
direnv allow
```

## my-app

 `nodeLinker: pnpm` 전환 후 "Cannot read properties of null (reading 'useState') error" 발생. eject 혹은 react-app-rewired 하여 postcss 제거 필요

- create-react-app 기반 프로젝트

## vite-ssr-project

`nodeLinker: pnp` 모드 하위종속성 충돌로 사용 불가
별도로 nm-projects에 옮겨 `nodeLinker: node_modules`로 전환 후 문제가 해결된 것으로 보였으나 `@common/components` 내부 모듈이 설치되지 않는 이슈가 발견되어 projects에 다시 옮겨진 뒤 `nodeLinker: pnpm` 전환 후 해결 된 것으로 확인 됨.
