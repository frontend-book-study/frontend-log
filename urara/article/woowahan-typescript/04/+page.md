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

#### Q1. 아래와 같은 유한한 키("사과", "딸기")를 집합으로 가지는 Record가 있을 때 Category 타입을 지정해 보세요.

#### A1. 
```ts
type Category = "사과" | "딸기";
```

#### Q2. 만약 무한한 키를 집합으로 가지는 Record일 경우 Category와 fruitsCategory의 타입을 어떻게 지정해볼 수 있을까요?

```ts
type Category = unknown;
interface fruit {
  name: string;
}

const fruitsCategory: Record<Category, fruit> = {
  사과: { name: "apple" },
  딸기: { name: "strawberry" }
};
```

#### A2. 키가 무한한 상황인 경우 Partial을 사용하여 해당 값이 존재하지 않는 경우를 처리할 수 있습니다.
```ts
type PartialRecord<K extends string,T> = Partial<Record<K,T>>;
type Category = string;

interface fruit {
  name: string;
}

const fruitsCategory: PartialRecord<Category, fruit[]> = {
  여름: [{ name: "복숭아" }, { name: "수박" }],
  겨울: [{ name: "딸기" }, { name: "한라봉" }]
};

fruitsCategory["봄"] //fruit[] 또는 undefined 타입으로 추론
fruitsCategory["봄"].map((fruit)=>console.log(fruit.name)); //컴파일 에러 발생! Object is possibly 'undefined'.(2532)
fruitsCategory["봄"]?.map((fruit)=> console.log(fruit.name)) //OK!
```


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


#### A

