# 📊 장사하기 좋은날 챗봇

소상공인을 위한 **상권 분석 기반 창업 의사결정 지원 챗봇**  
사용자가 자연어로 질문하면, 실제 상권 데이터를 기반으로 **유리/보통/불리** 판정을 내려주고, 상세한 상권 분석 정보를 제공합니다.

<br>

## 팀원 구성

<div align="center">

| **박재민** | **유재환** | **이상윤** | **이제원** | **차기원** | **전우진** |
| :------: |  :------: | :------: | :------: | :------: | :------: |
| [<img src="https://avatars.githubusercontent.com/u/104808174?v=4" height=150 width=150> <br/> @JMespoir](https://github.com/JMespoir) | [<img src="https://avatars.githubusercontent.com/u/138412939?v=4" height=150 width=150> <br/> @letsgojh](https://github.com/letsgojh) |[<img src="https://avatars.githubusercontent.com/u/97370661?v=4" height=150 width=150> <br/> @dltkddbs7979](https://github.com/dltkddbs7979)  | [<img src="https://avatars.githubusercontent.com/u/105234406?v=4" height=150 width=150> <br/> @cozymob](https://github.com/cozymob) |[<img src="https://avatars.githubusercontent.com/u/189634852?v=4" height=150 width=150> <br/> @cha9572](https://github.com/journey-ji) | [<img src="https://avatars.githubusercontent.com/u/219519048?v=4" height=150 width=150> <br/> @Jeonwoojin-1006](https://github.com/Jeonwoojin-1006)
</div>
<br>

## 프로젝트 개요
- **프로젝트명**: 장사하기 좋은날 챗봇 (Good Day to Start Business Chatbot)
- **목적**: 소상공인이 창업 전 상권을 손쉽게 분석하고 창업 타당성을 빠르게 판단할 수 있도록 지원
- **핵심 기능**
  - 지역별 유동인구, 점포 수, 임대료 등 상권 지표 분석
  - 업종별 맞춤형 가중치 로직으로 창업 유리/불리 판정
  - GPT 기반 자연어 인터페이스 제공
  - 서울시 공공데이터 API 및 OpenAI API 연동

<br>

<br>

## 주요기능
- 상권 검색 : "강남구 역삼동 역삼역 1번출구에 카페 업종으로 창업하면 괜찮을까?" -> 상권 분석 결과 제공
- 데이터 기반 분석 : 경쟁 점포 수, 유동인구, 임대료, 추정매출 지표
- AI 응답 : GPT를 활용한 자연어 질의응답
- 업종 특화 분석 : 음식 서비스, 패스트푸드점, 교육시설, 의료보건, 판매 업종 등 대분류된 10개의 업종에 대해 제공된 정보를 바탕으로 특화된 데이터 분석

<br>


<br>


## 시스템 아키텍처

<br>
<img width="1740" height="552" alt="image" src="https://github.com/user-attachments/assets/2e3eb50d-0915-4906-b127-88bd9984cb17" />

<br>


## 프로젝트 구조


<br>


<br>


## 데이터베이스 스키마

### CompanyPopulationCommercial
```javascript
{
  __type : string,
  value : [
    [districtName:string , population:number]
    ["자하문터널", 184945247]
  ]
}
```

### CompanyPopulationHinterland
```javascript
{
  __type : string,
  value : [
    [districtName:string , population:number]
    ["자하문터널", 184945247]
  ]
}
```

### FloatingPopulationCommercial.json
```javascript
{
  __type : string,
  value : [
    [districtName:string , population:number]
    ["자하문터널", 184945247]
  ]
}
```
### FloatingPopulationHinterland.json
```javascript
{
  __type : string,
  value : [
    [districtName:string , population:number]
    ["자하문터널", 184945247]
  ]
}
```
### ResidentPopulationCommercial.json
```javascript
{
  __type : string,
  value : [
    [districtName:string , population:number]
    ["자하문터널", 184945247]
  ]
}
```
### ResidentPopulationHinterland.json
```javascript
{
  __type : string,
  value : [
    [districtName:string , population:number]
    ["자하문터널", 184945247]
  ]
}
```
### MarketCountCommercial.json
```javascript
{
  __type : string,
  value : [
    districtName: string ,
    list : [
    [serviceName : string, marketCount : number]
    [외식업, 234801]
  ]
}
```
### MarketCountHinterland.json
```javascript
{
  __type : string,
  value : [
    hinterlandName: string,
    list : [
    [serviceName : string, marketCount : number]
    [외식업, 234801]
  ]
}
```
### EstimatedIncomeCommercial.json
```javascript
{
  __type : string,
  value : [
    districtName: [
    list : [
    [serviceName : string, estimatedIncome : number]
    [외식업, 234801]
  ]
}
```

### EstimatedIncomeHinterland.json
```javascript
{
  __type : string,
  value : [
    hinterlandName: string ,
    list : [
    [serviceName : string, estimatedIncome : number]
    [외식업, 234801]
  ]
}
```

### GuRent.json
```javascript
{
  __type : string,
  rentPerPyeong : number
}
```

### GuEstimatedIncome.json
```javascript
{
  __type : string,
  estimatedIncomeAverage : number
}
```

## 기여 가이드

### Git Convention
- **Commit Message 규칙**
  - `feat`: 새로운 기능 추가  
  - `fix`: 버그 수정  
  - `docs`: 문서 수정  
  - `style`: 코드 스타일 변경 (포맷팅, 세미콜론 등)  
  - `refactor`: 코드 리팩토링  
  - `test`: 테스트 코드 관련 작업  
  - `chore`: 빌드 업무, 패키지 매니저 설정 등

- **예시** :
  
```
    feat: 유저 로그인 API 추가

    fix: 회원가입 시 이메일 중복 체크 오류 수정

    docs: README 설치 방법 업데이트
```

### Branch 전략
- **main**: 배포 가능한 안정적인 코드만 머지  
- **develop**: 개발 브랜치, 기능 단위 브랜치들을 여기서 통합  
- **feature/**: 새로운 기능 개발 (`feature/login`, `feature/chat`)  
- **fix/**: 버그 수정 (`fix/login-error`)

- **예시** :

```
src/
├── devlop/        
│   ├── feature/login           
│   └── feature/chat<br>   

``` 

### Pull Request 규칙
1. PR 제목은 **작업 내용 요약** (예: `feat: 채팅 UI 추가`)  
2. 최소 **1명 이상 리뷰 승인** 후 머지



<br>

## 기술 스택
- **Frontend** : React(Vite)
- **Backend** : Node.js, Express
- **AI/LLM** : OpenAi GPT API, Agentica
- **Infra** : Render
- **Docs** : Swagger, JSDoc
- **Collaboration** : Discord, Notion, Github, Git

<br>

<br>


## 개발 시작 날짜

- 시작 날짜 : 2025-08-03 ~

<br>

<br>


## 설치 및 실행방법
<br>

### 필수 요구사항
- **Node.js**: v22.0.0 이상
- **pnpm**: 10.0.0 이상 (권장) 또는 npm

<br>

**0. 저장소 클론**

```
  git clone https://github.com/letsgojh/GGN_NODE_SERVER.git main
  cd testgit
```



**1. .env 변수 설정**

client와 server 그리고 node-server 디렉토리에 각각 .env파일을 생성 후 아래 변수를 설정합니다.

**client/.env**

    OPENAI_API_KEY=OPEN AI Platform에서 발급받은 API KEY
    VITE_AGENTICA_WS_URL=ws://localhost:3000/chat


**server/.env**

    OPENAI_API_KEY=OPEN AI Platform에서발급받은 API KEY
    PORT=agentica 서버를 실행 포트번호

**node-server/.env**

    AUTHENTICATION_KEY=서울시 열린광장에서 발급받은 API KEY
    PORT=node 서버를 실행 포트번호


**2. Agentica client 서버 실행 (프론트)**

    cd client
    pnpm install
    pnpm start

**3. Node 백엔드 서버 실행**

    cd node-server
    npm install
    npm run build //dist/ 생성
    npm start //지정한 port에서 서버 가동

**4. Agentica 서버 실행**

    cd agentica-server
    pnpm install
    pnpm build
    pnpm start

**5. chatbot 사용**

<br>

**브라우저에서 다음 주소로 접속 :**

```
  http://localhost:5173 //또는 client 실행 시 지정한 포트
```
    
- 이후 챗봇에게 양식에 맞는 요청을 입력하면 됩니다.
- ⚠️ 질문이 지정된 form과 어긋날 경우 응답이 거절될 수 있습니다.

<br>


<br>

## 참고 프로젝트

이 프로젝트는 다음과 같은 오픈소스 라이브러리를 사용합니다.

- **Express**: Node.js를 위한 빠르고 개방적인 웹 프레임워크입니다.

- **dotenv**: .env 파일에서 환경 변수를 로드하는 모듈입니다.

- **swagger-jsdoc**: JSDoc 주석을 기반으로 Swagger 문서를 생성합니다.

- **swagger-ui-express**: Express 애플리케이션에서 Swagger UI를 제공합니다.

- **TypeScript**: JavaScript의 상위 집합으로 정적 유형을 추가합니다.

- **[Agentica](https://github.com/wrtnlabs/agentica)** : 
    오픈소스 LLM 에이전트 프레임워크.
    본 프로젝트는 Agentica의 **LLM 함수 호출 설계 및 클라이언트-서버 구조**를 참고하여 구현되었습니다.

<br>

## 라이센스

이 프로젝트에서 사용하는 라이브러리의 라이센스는 다음과 같습니다.

- **Express**: MIT License

- **dotenv**: BSD-2-Clause License

- **swagger-jsdoc**: Apache 2.0 License

- **swagger-ui-express**: MIT License

- **TypeScript** : Apache 2.0 License

<br>

## 사용 예시

- **챗봇 사용전 guide page**
  
<img width="1000" height="500" alt="image" src="https://github.com/user-attachments/assets/41744616-5d7f-4511-b306-7d7ecf162447" />


- **챗봇에게 상권분석 요청**

<img width="500" height="1000" alt="image" src="https://github.com/user-attachments/assets/5f697b7e-b2df-4c31-a429-37a9acf10e06" />


<br>


## 문제 해결

<br>

### 포트 충돌 시


- .env 파일에서 포트 변경

```

  PORT=3005

```


## 문의처
![Github](https://img.shields.io/badge/Github-181717.svg?&style=for-the-badge&logo=GitHub&logoColor=white)
![Gmail](https://img.shields.io/badge/Gmail-EA4335.svg?&style=for-the-badge&logo=Gmail&logoColor=white)
![Naver](https://img.shields.io/badge/Naver-03C75A.svg?&style=for-the-badge&logo=Naver&logoColor=white)
