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

 `nodeLinker: pnpm` 전환 후 "Cannot read properties of null (reading 'useState') error" 발생 react-app-rewired 하여 postcss 제거 필요
