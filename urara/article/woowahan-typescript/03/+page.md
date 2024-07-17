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

#### Q

#### A

## 5.2 템플릿 리터럴 타입 활용하기

#### Q

#### A

## 5.3 커스텀 유틸리티 타입 활용하기

#### Q

#### A
