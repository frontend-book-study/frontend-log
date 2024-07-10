---
title: '2주차: 3장 고급 타입 (80~119)'
created: 2024-07-10
updated: 2024-07-10
tags:
  - '우아한타입스크립with리액트'
  - 'Frontend'
  - 'Study'
  - 'Book'
---


## 3.1 타입스크립트만의 독자적 타입 시스템

### any타입, unknown 타입, void 타입

#### Q

#### A

### never 타입, Array 타입, enum 타입

#### Q

#### A

## 3.2 타입 조합

### 교차 타입, 유니온 타입

#### Q A 또는 B 타입을 만족하는 경우라면 유니온 타입으로 사용합니다. printItem이라는 함수에서 A | B 타입으로 받고 있고 다음과 같은 코드를 작성 후 에러가 발생합니다. 에러를 발생시키지 않으려면 코드를 어떻게 수정해야 할까요?

```typescript
type T = 'a' | 'b'
type A = {name: string; type: T}
type B = {name: string; imageUrl: string}

const printItem = (item: A | B) => {
  console.log(item.name)
  console.log(item.imageUrl)
  console.log(item.type)
}
```
#### A
A 또는 B 타입을 만족하는 경우이므로 교차 타입을 활용하는건 A,B 타입 모두 만족하는 매개변수를 전달해야하므로 조건에 부합하지 않았습니다. 
```typescript
type T = 'a' | 'b';
type A = { name: string; type: T };
type B = { name: string; imageUrl: string };

const printItem = (item: A & B) => {
    console.log(item.name);
    console.log(item.imageUrl);
    console.log(item.type);
};

//name, type, imageUrl을 모두 전달해야만 함.
printItem({ name: '', type: 'a' ,imageUrl:""});
//Argument of type '{ name: string; imageUrl: string; }' is not assignable to parameter of type 'A & B'.
//Property 'type' is missing in type '{ name: string; imageUrl: string; }' but required in type 'A'.ts(2345)
printItem({ name: 'HENA', imageUrl: '/src/image.png' });
```
그래서 item의 type이나 imageUrl이 A 또는 B 타입인지 확인하는 작업이 필요해보였습니다.
```typescript
type T = 'a' | 'b';
type A = { name: string; type: T };
type B = { name: string; imageUrl: string };

const printItem = (item: A | B) => {
    console.log(item.name);
    //item 객체가 type이라는 속성을 가지고 있는지 확인
    if('type' in item){
        //item이 A 타입인 것을 확인??
        console.log(item.type);
    }

    if('imageUrl' in item){
        console.log(item.imageUrl);
    }
};

printItem({ name: '', type: 'a'}); //OK
printItem({ name: 'HENA', imageUrl: '/src/image.png' }); //OK
```
item 객체가 type또는 imageUrl 속성을 가지고 있는지 확인하여 오류를 해결해보았습니다.

### 인덱스 시그니처, 인덱스 엑세스 타입

#### Q

#### A

### 맵드 타입, 템플릿 리터럴 타입, 제네릭

#### Q

#### A

## 3.3 제네릭 사용법

### 함수의 제네릭, 호출 시그니처의 제네릭, 제네릭 클래스

#### Q

#### A

### 제한된 제네릭, 확장된 제네릭, 제네릭 예시

#### Q

#### A
