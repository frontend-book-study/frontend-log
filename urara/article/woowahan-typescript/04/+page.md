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

#### Q


#### A


## 6, 7장.1 비동기 호출5~8)

#### Q
1. Superstruct의 두가지 핵심 역할은 무엇인가요?
2. 아래 코드를 참고해서 주어진 데이터를 Superstruct를 사용해서 어떻게 검증을 하는지 설명해주세요.
```ts
import { object, string, array, number, assert } from 'superstruct';

const Article = object({
    id: number(),
    title: string(),
    tags: array(string()),
    author: string(),
});

const data = {
    id: 1,
    title: "Hello World",
    tags: ["news", "update"],
    author: "John Doe",
};

try {
    assert(data, Article); // 데이터 검증
    console.log("Valid data:", data);
} catch (error) {
    console.error("Invalid data:", error);
}
```


#### A
1. Superstruct의 두가지 핵심
  - 첫째, 인터페이스 정의와 자바스크립트 데이터의 유효성 검사를 쉽게 할 수 있다.
  - 둘째, 런타임에서의 데이터 유효성 검사를 통해 개발자와 사용자에게 자세한 런타임 에러를 보여줄 수 있다.
2. 
- `Article`은 id는 number, title은 string, tags는 문자열 배열, author는 id라는 number 속성을 가진 객체 형태의 object로, 해당 데이터 명세를 가진 스키마입니다. 
- `assert`는 데이터의 유효성 검사를 도와주는 **Superstruct**의 모듈로 데이터의 정보 `data`와 데이터 명세 스키마인 `Article`을 인자로 받아 데이터가 스키마와 부합하는지 유효성 검사를 진행한 후, 유효하지 않을 시 에러를 던집니다.
- 따라서, 데이터가 유효할 경우 성공적으로 `Valid data: ${data}`가 출력될 것입니다. 유효하지 않을 경우에는 `try...catch` 블록 내의 `catch` 부분이 실행되어 `Invalid data: ${error}` 에러메세지가 출력될 것입니다.
