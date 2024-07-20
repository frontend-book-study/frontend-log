---
title: '3주차: 4장 타입 확장하기.좁히기 ~ 5장.3 타입 활용하기'
created: 2024-07-17
updated: 2024-07-17
tags:
- '우아한타입스크립with리액트'
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
별개로 extends 키워드를 사용한 타입이 교차 타입과 100% 사응하지 않는다는 점을 주의해야합니다.
```ts
interface DeliveryTip {
  tip:number;
}

interface Filter extends DeliveryTip {
  tip:string;
  //Interface 'Filter' incorrectly extends interface 'DeliveryTip'.
  //Types of property 'tip' are incompatible.
  //Type 'string' is not assignable to type 'number'.
}
```
위 예시는 DeliveryTip을 extends한 Filter 타입에 string 타입의 속성 tip을 선언하면 DeliveryTip의 number 타입과 호환이 되지 않는다는 에러가 발생합니다.
```ts
type DeliveryTip = {
  tip: number;
}

type Filter = DeliveryTip & {
  tip: string;
}
```
type과 &로 바꿨을 뿐인데 에러가 발생하지 않습니다. 이때 Filter의 tip 속성 타입은 never가 됩니다. type 키워드는 교차 타입으로 선언되었을 때 새롭게 추가되는 속성에 대해 미리 알 수 없기 때문에 에러가 발생하지 않습니다. 하지만 tip이라는 같은 속성에 대해 서로 호환되지 않는 타입이 선언되어 never 타입이 되버린다는 점을 주의해야 합니다.

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

#### Q 가격에 따라 상품 이름을 반환해주는 함수 getProductName이 있습니다. 여기에 "5000"짜리 상품이 하나 더 생겨서 ProductPrice 타입이 업데이트 되어야 하는 상황이 발생할 수 있습니다. 모든 케이스에 대한 타임 검사를 강제하고 싶은데 어떻게 하면 좋을까요.

```typescript
type ProductPrice = "10000" | "20000";

const getProductName = (price: ProductPrice) => {
    if(price === "10000") {
        return "Product A";
    }
    if(price === "20000") {
        return "Product B";
    }
    else {
        return "Product C";
    }
};
```

#### A 모든 케이스에 대한 타입 검사를 강제하기 위해서는 `exhaustiveCheck` 함수를 추가하면 됩니다. 이 함수는 `never` 타입을 인자로 받아야 하며, 예상치 못한 값이 들어오면 오류를 발생시킵니다.
```typescript
type ProductPrice = "10000" | "20000" | "5000";

const getProductName = (price: ProductPrice): string => {
    if(price === "10000") {
        return "Product A";
    }
    if(price === "20000") {
        return "Product B";
    }
    if(price === "5000") {
        return "Product C";
    }
    exhaustiveCheck(price);
};

const exhaustiveCheck = (param: never) => {
    throw new Error("type error!");
};

```
이렇게 수정하면 `ProductPrice` 타입에 새로운 값이 추가될 때, `getProductName` 함수에서 모든 케이스를 처리하도록 강제할 수 있습니다.

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
