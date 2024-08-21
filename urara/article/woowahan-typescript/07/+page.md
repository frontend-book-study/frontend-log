---
title: '7주차: 10장 상태 관리 ~ 12장 타입스크립트 프로젝트 관리 (306~363)'
created: 2024-08-21
updated: 2024-08-21
tags:
- '우아한타입스크립with리액트'
---

## 10.1 상태 관리

#### Q


#### A


## 10.2 상태 관리 라이브러리

#### Q


#### A


## 11 CSS in JS

#### Q


#### A


## 12.1 앰비언트 타입 활용하기

#### Q
타입스크립트 컴파일러에 타입 정보를 알려주는 declare 키워드를 효과적으로 활용할 수 있는 방법에는 무엇이 있을까요?


#### A
declare 키워드는 아래와 같이 효과적으로 활용할 수 있습니다.
1. declare type 활용
    - 보편적으로 많이 사용하는 커스텀 유틸리티 타입을 `declare type` 으로 선언하여 전역에서 사용할 수 있습니다.
```ts
declare type Nullable<T> = T | null;

const name: Nullable<string> = "woowa";
```
2. declare module 활용
    - CSS-in-JS 라이브러리를 사용할 때, theme의 인터페이스 타입을 확장하여 theme 타입이 자동으로 완성되도록 하는 기능을 추가할 수 있습니다.
```ts
declare module "styled-components" {
    type Theme = typeof theme;

    export interface DefaultTheme extends Theme {}
}
```
3. declare namespace 활용
    - Node.js 환경에서 .env 파일을 사용할 때, `declare namespace` 를 활용하여 `process.env` 로 설정값을 손쉽게 불러오고 환경변수의 자동 완성 기능을 쓸 수 있습니다.
```ts
declare namespace NodeJS {
    interface ProcessEnv {
        readonly API_URL: string;
        readonly API_INTERNAL_URL: string;
    }
}
```
4. declare global 활용
    - 전역 변수인 Window 객체의 스코프에서 사용되는 모듈이나 변수를 추가할 수 있습니다.
```ts
declare global {
    interface Window {
        newProperty: string;
    }
}
```

## 12.2 스크립트와 설정 파일 활용하기 ~ 12.3 타입스크립트 마이그레이션

#### Q


#### A


## 12.4 모노레포

#### Q


#### A

