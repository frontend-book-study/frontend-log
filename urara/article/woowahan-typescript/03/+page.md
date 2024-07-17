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

#### Q 식별할 수 있는 유니온의 판별자가 '유닛 타입'이어야 하는 이유를 아래 예시를 바탕으로 설명해주세요.
```ts
interface A {
  value: 'a';
  answer: 1;
}

interface B {
  value: string;
  answer: 2;
}

interface B {
  value: Error;
  answer: 3;
}

type Unions = A | B | C;
function handle(params: Unions) {
  if (params.value == 'string') {
    params.answer;
  }

  if (params.answer == 1) {
    params.value;
  }

}
```

#### A
유닛 타입이 아니라면 정확하게 타입이 좁혀지지 않기 때문입니다.
예시에서 handle함수의 첫번째 if문의 params.answer값은 값이 정확하게 좁혀지지 않아 1 | 2 | 3 이 될 수 있습니다. 하지만 두번째 if문의 params.value값은 식별할 수 있는 유니온의 판별자가 유닛 타입인 1 이기 때문에 A interface로 타입이 좁혀져 'a'가 됩니다.

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
