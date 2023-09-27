# mysecret-cli

`mysecret-cli`는 AWS Lambda와 Serverless를 사용하여 구성된 CLI 도구입니다. 이 도구를 사용하면 명령어를 통해 암호화된 정보를 안전하게 가져올 수 있습니다.

## 시작하기

> 필요한 것들
    > - Node.js
    > - AWS 계정 (Lambda, API Gateway 사용을 위해)
    > - Serverless Framework

### 설치하기

1. 이 레포지토리를 클론받습니다:

    ```bash
    git clone [레포지토리_URL]
    ```

2. 디렉터리로 이동하여 필요한 npm 패키지를 설치합니다:

    ```bash
    cd mysecret-cli
    npm install
    ```

### 사용법

1. .env 파일을 수정하여 필요한 환경 변수(예: API_ENDPOINT, AWS_CREDENTIALS 등)를 설정합니다.

2. mysecret-cli를 전역으로 설치하려면 다음을 실행합니다:

    ```bash
    npm link
    ```

3. CLI 사용법:

    ```bash
    mysecret-cli get --password YOUR_SECRET_PASSWORD --key YOUR_FILE_KEY
    ```

### 구조

```bash
mysecret-cli/
├── src/
│   └── index.js                 # CLI의 메인 실행 파일
├── serverless/
│   ├── handler.js               # Lambda 함수 핸들러
│   └── serverless.yml           # Serverless 구성 파일
├── .env                         # 환경 변수 (비밀 키, API endpoint 등)
└── package.json                 # npm 패키지 정보 및 의존성
```
