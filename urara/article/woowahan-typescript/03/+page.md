---
title: '3주차: 4장 타입 확장하기.좁히기 ~ 5장.3 타입 활용하기'
created: 2024-07-17
updated: 2024-07-17
tags:
  - '우아한타입스크립with리액트'
  - 'Frontend'
  - 'Study'
  - 'Book'
---

## 4.1 타입 확장하기

```ts
type User = {
  nickName: string;
}

type GithubUser = User & {
  nickName: "blan19";
}
```
#### Q1. GithubUser 타입의 nickName 타입은 무엇인가요?

#### A1. GithubUser 타입의 nickName 타입은 "blan19" 입니다.
```ts
interface User {
  nickName: string;
}

interface GithubUser extends User {
  nickName: "blan19";
}
```
extends 경우도 GithubUser 타입의 nickName 타입은 "blan19" 입니다.

#### Q2. 추가로 왜 그러한 타입이 나왔는지 설명해주세요

#### A2. 왜냐하면 GithubUser 타입은 User 타입에 추가로 nickName 타입이 "blan19" 이라는 값을 가지기 때문에 그러한 타입이 나온겁니다.


## 4.2 타입 좁히기 - 타입 가드

#### Q

#### A

## 4.3 타입 좁히기 - 식별할 수 있는 유니온

#### Q

#### A

## 4.4 Exhaustiveness Checking으로 정확한 타입 분기 유지하기

#### Q

#### A

## 5.1 조건부 타입

#### Q

#### A

## 5.2 템플릿 리터럴 타입 활용하기

#### Q

#### A

## 5.3 커스텀 유틸리티 타입 활용하기

#### Q

#### A
