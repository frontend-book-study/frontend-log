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


#### A

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

#### Q


#### A


## 8.1 리액트 컴포넌트의 타입 (1)

#### Q


#### A

## 8.1 리액트 컴포넌트의 타입 (2)

#### Q


#### A
