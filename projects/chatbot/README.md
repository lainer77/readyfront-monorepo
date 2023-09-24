# 챗봇 테스트용 프로젝트

1. **프로젝트 구조**:
   - 전체 구조는 두 개의 애플리케이션으로 나누어져 있습니다.
      - `express-app`: Node.js/Express 기반 앱
      - `flask-app`: Python/Flask 기반 앱

2. **Express App**:
   - `express-app`에서는 OpenAI API와 통신하여 집사와 나비의 대화 기능을 구현하고 있습니다.
   - 사용자가 메시지를 보내면, 이 메시지를 바탕으로 OpenAI API에 요청을 보내고 그 결과를 반환합니다.
   - 이 앱은 AWS Lambda와 API Gateway에 배포 됩니다. 따라서, `serverless.yml`에서 `expressApp` 함수를 통해 정의되어 있습니다.

3. **Flask App**:
   - `flask-app`에서는 문장 간의 유사도를 계산하는 기능을 제공합니다.
   - `SentenceTransformer`를 사용하여 문장 임베딩을 생성하고, 이를 사용하여 두 문장 간의 유사도를 계산합니다.
   - 이 앱도 AWS Lambda와 API Gateway에 배포 됩니다, `serverless.yml`에서 `flaskApp` 함수를 통해 정의되어 있습니다.

## Ko-Sentence-Transformers

설치

``` bash
pip3 install flask sentence-transformers
```

실행

``` bash
python3 transformer.py
```

위의 명령서 사용시 <http://127.0.0.1:5000로> flask 앱 실행됨

## 나비야~ 고양이 챗봇

실행

``` bash
open -a "Google Chrome" index.html
```

## py, node serverlesss에 동시 배포

Serverless Framework 설치 및 설정:

먼저, Serverless Framework를 설치합니다.

``` bash
npm install -g serverless
```

AWS credentials를 설정합니다.

``` bash
serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY
```

Express 앱 (server.js)용 serverless.yml 생성:

프로젝트 루트 디렉토리에 serverless.yml 파일을 생성하고 다음 내용을 추가합니다.

``` yaml
service: express-server

provider:
  name: aws
  runtime: nodejs14.x
  memorySize: 256
  timeout: 10

functions:
  app:
    handler: handler.handler
    events:
      - http: ANY /
      - http: 'ANY {proxy+}'
```

여기서, handler.js는 Express 앱을 Lambda에서 실행하기 위한 래퍼(wrapper)를 포함하고 있습니다.

Express 앱 Lambda 래퍼 (handler.js) 생성:

serverless-http 패키지를 사용하여 Express 앱을 AWS Lambda와 호환되게 만듭니다.

``` bash
npm install serverless-http
```

그 다음, 프로젝트 루트에 handler.js 파일을 생성하고 다음 코드를 추가합니다.

``` javascript
const serverless = require('serverless-http');
const app = require('./server');  // 경로를 Express 앱의 위치에 맞게 조정

module.exports.handler = serverless(app);
```

Flask 앱 (app.py)용 serverless.yml 생성:

Flask 앱 디렉토리에 serverless.yml 파일을 생성하고 다음 내용을 추가합니다.

``` yaml
service: flask-server

provider:
  name: aws
  runtime: python3.8

functions:
  app:
    handler: handler.handler
    events:
      - http: POST /similarity
```

여기서, handler.py는 Flask 앱을 Lambda에서 실행하기 위한 래퍼(wrapper)를 포함하고 있습니다.

Flask 앱 Lambda 래퍼 (handler.py) 생성:

serverless-wsgi 패키지를 사용하여 Flask 앱을 AWS Lambda와 호환되게 만듭니다.

``` bash
pip install serverless-wsgi
```

Flask 앱 디렉토리에 handler.py 파일을 생성하고 다음 코드를 추가합니다.

``` python
from serverless_wsgi import handle_request
from app import app  # Flask 앱의 이름이 'app'라고 가정

def handler(event, context):
    return handle_request(app, event, context)
```

## 배포

express-app 패키지 설치

``` bash
cd express-app
yarn
```

flask-app 패키지 설치

``` bash
cd flask-app
pip install -r requirements.txt -t ./vendored
```

각 앱의 디렉토리에서 다음 명령어를 실행하여 AWS Lambda 및 Amazon API Gateway에 배포합니다.

``` bash
serverless deploy
```

배포 후에는 출력된 API Gateway 엔드포인트를 사용하여 앱에 액세스할 수 있습니다. server.js에서 Flask API를 호출할 때 이 엔드포인트를 사용해야 합니다.

## AWS Lambda에서 SentenceTransformer 사용하기

### 1. 소개

AWS Lambda의 기본 패키지 제한은 250MB입니다. 큰 라이브러리나 패키지를 Lambda에 배포하려면 이 제한 내에 있어야 합니다. SentenceTransformer 같은 큰 패키지를 사용하려면 Lambda Layer를 사용해야 합니다.

### 2. Lambda Layer로 SentenceTransformer 준비하기

#### 2.1. 작업 디렉토리 생성

``` bash
mkdir sentence_transformer_layer
cd sentence_transformer_layer
```

#### 2.2. Python 패키지 디렉토리 설정

AWS Lambda에서 사용할 Python 라이브러리는 특정 폴더 구조에 있어야 합니다.

``` bash
mkdir -p python/lib/python3.8/site-packages
```

#### 2.3. 패키지 설치

``` bash
pip install -t python/lib/python3.8/site-packages sentence-transformers
```

#### 2.4. zip 파일로 압축

``` bash
zip -r sentence_transformer_layer.zip python/
```

#### 2.5. zip 파일 Layer에 배포

``` bash
aws lambda publish-layer-version --layer-name SentenceTransformerLayer --zip-file fileb://sentence_transformer_layer.zip
# sentence-transformers 패키지가 너무 커서 업로드 안됨
```

### 3. AWS Lambda Console에서 Layer 생성

1. AWS Lambda 콘솔로 이동합니다.
2. 왼쪽 메뉴에서 'Layers'를 선택하고 'Create layer' 버튼을 클릭합니다.
3. 적절한 이름과 설명을 제공합니다.
4. 'Upload' 버튼을 클릭하여 sentence_transformer_layer.zip 파일을 업로드합니다.
5. 'Create' 버튼을 클릭하여 레이어를 생성합니다.
6. 이제 새로 생성된 레이어를 Lambda 함수에 연결하여 SentenceTransformer를 사용할 수 있습니다.
