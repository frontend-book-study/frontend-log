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

#### Q API 요청 중 401 에러가 발생했을 때 로그인 페이지('/login')로 리다이랙트 시키려면 어떤 처리를 할 수 있을까요? 현재 아래처럼 호출하고 있다고 할 때 처리 예시를 작성해 주세요.

```ts
const fetchExample = async () => {
  const data = await api.fetchEample();
  return data
}
```

#### A
axios 인스턴스의 인터셉터를 사용해 에러를 처리할 수 있지만 try-catch 내에서 에러 처리를 통해서도 가능하다

```ts
const onActionError = (error: Error) => {
  if(error.resonse && error.response.status === 401) {
    window.location.href = "${url}/login";
  }
  return Promise.reject(error);
}

const fetchExample = async () => {
  try {
    const data = await api.fetchEample();
    return data
  } catch(error) {
    onActionError(error)
  }
}
```

## 7.4 API 모킹 (1)

#### Q


#### A

## 7.4 API 모킹 (2)

#### Q 어떤 상황에 API 모킹을 사용할 수 있고, 어떤 방법들이 있을까요?


#### A.
API 모킹은 1) 프론트 개발시 API가 준비되지 않은 경우, 2) 제한된 환경에서 테스트하기 위한 경우 3) 네트워크 이슈나 API호출 이슈를 재현하고싶을때 사용할 수 있습니다. 

API 모킹은 Charles와 같은 도구를 활용하거나 axios-mock-adapter와 같은 라이브러리를 사용해 API요청을 가로채고, 미리 정의된 응답을 반환하여 테스트를 진행할 수 있습니다.

## 8.1 리액트 컴포넌트의 타입 (1)

#### Q


#### A

## 8.1 리액트 컴포넌트의 타입 (2)

#### Q


#### A
