# 프로젝트 주의사항

빌드시에 오류가 발생하면 tsconfig.tsbuildinfo 파일을 지우고 재빌드해볼 것
tsconfig.tsbuildinfo 파일이 생성되면 타입스크립트 컴파일러는 이전 빌드 정보를 기반으로 캐싱하여 빌드 시간을 단축하려고 합니다. 이 파일이 생성되면 TypeScript는 이전 빌드의 결과를 기억하고 변경 사항이 없는 경우에는 다시 빌드하지 않습니다.

tsconfig.tsbuildinfo 파일이 생성되어 있을 때, .ts 파일의 변경 사항이 반영되지 않거나 타입 선언 파일(.d.ts)이 생성되지 않을 수 있습니다. 이것은 TypeScript의 캐싱 메커니즘이 변경 사항을 감지하지 못하기 때문입니다.
