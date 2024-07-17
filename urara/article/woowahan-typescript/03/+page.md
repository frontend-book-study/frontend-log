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

#### Q

#### A

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

#### Q extends 는 어디에 쓰일 때 어떤 역할을 하는지 2가지 이상 설명해주세요.

#### A 

extends 키워드는 타입을 확장할 때와 타입을 조건부로 설정할 때 사용되며, 제네릭 타입에서는 한정자 역할로도 사용됩니다.

제네릭 조건부 extends를 사용할 경우에는 유니온을 사용할 때보다 타입 결과가 명확합니다. 또한, extends로 제네릭에 제한을 두어 휴먼에러를 줄일 수 있습니다.

```typescript
// 1. 타입을 확장할 때
interface Page { a: string }
interface Article extends Page { b: string }

// Article => { a: string; b: string }

// 2. 제네릭을 활용한 조건부 타입
type PayMethodType<T extends "card" | "appcard" | "bank"> = T extends "card" | "appcard" 
    ? Card : Bank

PayMethodType<"card"> // => Card
PayMethodType<"appcard"> // => Card
PayMethodType<"bank"> // => Bank
```

#### Q infer 를 사용해 간단한 타입을 지정해보고 이에 대해 설명해주세요.

#### A

```typescript
type UnpackPromise<T> = T extends Promise<infer K> ? K : T

const a: UnpackPromise<string> = '3'
const b: UnpackPromise<Promise<boolean[]>> = [true]
```

infer는 추론하다는 의미와 역할을 가지고 있습니다. 

`UnpackPromise`은 제네릭으로 Promise가 래핑된 경우라면 추론한 타입 K를 반환하고 아니라면 T를 반환하는 infer를 활용한 타입입니다.

* 책에 있는 타입에는 오류가 있습니다.

## 5.2 템플릿 리터럴 타입 활용하기

#### Q

#### A

## 5.3 커스텀 유틸리티 타입 활용하기

#### Q

#### A
