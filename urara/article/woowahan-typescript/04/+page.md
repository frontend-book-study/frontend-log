---
title: '4주차: 5장.4 타입 활용하기 ~ 7장.1 비동기 호출 (174~217)'
created: 2024-07-24
updated: 2024-07-24
tags:
- '우아한타입스크립with리액트'
---

## 0, 5.4 불변 객체 타입으로 활용하기

#### Q


#### A


## 1, 5.5 Record 원시 타입 키 개선하기

#### Q


#### A


## 2, 6.1 자바스크립트의 런타임과 타입스크립트의 컴파일

#### Q


#### A


## 3, 6.2 타입스크립트 컴파일러의 동작

#### Q


#### A


## 4, 6.3 타입스크립트 컴파일러의 구조

#### Q


#### A


## 5, 7장.1 비동기 호출1~4)

#### Q1. Fetch와 Axios의 차이는 무엇인가요?

#### A1. Fetch는 브라우저에 내장된 API이고, Axios는 브라우저와 Node.js에서 사용할 수 있는 라이브러리입니다. 

Fetch는 내장 라이브러리이기 때문에 따로 임포트하거나 설치할 필요 없이 사용할 수 있습니다. 그러나 많은 기능을 사용하려면 직접 구현해서 사용해야 합니다.

Axios는 API 정책에 따라 인스턴스를 다양하게 구성할 수 있습니다. 또한, 요청과 응답을 인터셉트할 수 있는 기능을 제공합니다. 

#### Q2. Axios Intercepter 기능을 사용하면 어떤 처리가 가능해지나요?

#### A2. Axios Intercepter 기능을 사용하면 header 를 설정하는 기능을 넣거나 에러를 처리할 수 있습니다.

```typescript
import config = require("tailwindcss/defaultConfig");

const instance = axios.create({
    baseURL: 'https://api.example.com'
});
instance.interceptors.request.use(
    (config) => {
        config.headers = {
            ...config.headers,
            "Content-Type": "application/json",
        }
    return config;},
    (error) => {
        return Promise.reject(error);
    }
);
```

빌더 패턴(객체 생성을 더 편리하고 가독성 있게 만들기 위한 디자인 패턴 중 하나)을 사용해 API를 호출하기 위한 래퍼를 빌더 패턴을 만들 수 있습니다.

```typescript
const fetch = async (name?: string) => {
    const api = new ApiBuilder()
        .setUrl('https://api.example.com')
        .setMethod('GET')
        .setPath('/api')
        .setParams({ name })
        .build();
}
```

## 6, 7장.1 비동기 호출5~8)

#### Q


#### A

