---
title: 5주차: 7장.2 비동기 호출 ~ 8장.1 JSX에서 TSX로 (218~267)
created: 2024-07-31
updated: 2024-07-31
tags:
- '우아한타입스크립with리액트'
---

## 7.2 API 상태 관리하기

#### Q


#### A


## 7.3 API 에러 핸들링(1)

#### Q 
Q. API 호출할 때 단순한 서버 에러 외에도 인증 정보 에러, 네트워크 에러, 타임아웃 에러 같은 다양한 에러가 발생하는데요. 이를 '서브 클래싱'을 활용하여 'NetworkError'라는 이름의 커스텀 에러 클래스를 정의해주세요.

#### A
```ts
class NetworkError extends Error {
    constructor(message: string, response?: AxiosResponse<ErrorResponse>) {
        super(message, response);
        this.name = "UnauthorizedError";
    }
}
```

#### Q 
Q. 이처럼 Custom Error 클래스를 서브클래싱하여 정의하는 이유는 무엇인가요?

#### A
에러를 서브클래싱해서 표현하면 명시적으로 에러 처리를 할 수 있습니다. 아래와 같이 작성된 타입 가드문을 통해 코드상에서 에러 핸들링에 대한 부분을 한눈에 볼 수 있습니다.

```ts
try {
    // ...
} catch (error) {
    if (error instanceof NetworkError) {
        alert("네트워크 연결이 원할하지 않습니다. 잠시 후 다시 시도해주세요.");
    }
}

```

## 7.3 API 에러 핸들링(2)

#### Q


#### A


## 7.4 API 모킹 (1)

#### Q


#### A

## 7.4 API 모킹 (2)

#### Q


#### A


## 8.1 리액트 컴포넌트의 타입 (1)

#### Q


#### A

## 8.1 리액트 컴포넌트의 타입 (2)

#### Q


#### A
