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

## Yarn Plugin

### @yarnpkg/plugin-workspace-tools

이 플러그인은 Yarn 작업 영역과 관련된 명령어를 추가합니다. 작업 영역의 모든 패키지에 대해 명령어를 실행하거나 일부 패키지에만 적용하도록 설정할 수 있습니다.

설치 방법

``` zsh
yarn plugin import workspace-tools
```

### @yarnpkg/plugin-typescript

이 플러그인은 Yarn과 TypeScript 간의 통합을 개선합니다. TypeScript 프로젝트에서 의존성을 확인하거나, TypeScript를 사용하는 프로젝트의 설정을 간소화하는 데 도움이 됩니다.

설치 방법

``` zsh
yarn plugin import typescript
```

### @yarnpkg/plugin-interactive-tools

이 플러그인은 패키지를 업그레이드할 때 대화식 모드를 제공하여 패키지 업데이트를 보다 쉽게 관리할 수 있습니다.

설치 방법

``` zsh
yarn plugin import interactive-tools
```

이러한 플러그인은 프로젝트에 따라 추가적인 이점을 제공할 수 있습니다. 프로젝트의 요구 사항에 따라 추가 플러그인을 검토하고 선택할 수 있습니다. Yarn 플러그인에 대한 자세한 정보는 다음 문서를 참조하십시오.
