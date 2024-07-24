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
1. 타입스크립트 컴파일러의 역할을 설명해 주세요.
2. 아래 코드가 동작하지 않는 이유를 타입스크립트 컴파일러의 동작과 함께 설명해 주세요.

```typescript
interface Square {
	width: number;
}

interface Rectangle extends Square {
	height: number;
}

type Shape = Square | Rectangle

function calculateArea(shape: Shape) {
	if (shape instanceof Rectangle) {
		return shape.width * shape.height;
	} else {
		return shape.width * shape.width;
	}
}
```

#### A 
1. 크게 2가지 역할을 합니다. 첫번째, 최신버전의 타입스크립트/자바스크립트 코드를 구버전의 자바스립트 코드로 변환해줍니다. 두번째, 코드의 타입 오류를 검사합니다.
2. 타입스크립트 인터페이스인 Rectangle은 컴파일 시간에만 존재합니다. 즉, 런타임에는 Rectangle이라는 타입이 존재하지 않습니다. 한편 instanceof 연산은 JavaScript 런타임 연산자로 어떤 클래스인의 인스턴스인지 아닌지를 검사합니다. 따라서 Rectangle라는 인스턴스가 없는데 instanceof 연산을 하므로 에러가 발생합니다.

## 4, 6.3 타입스크립트 컴파일러의 구조

#### Q


#### A


## 5, 7장.1 비동기 호출1~4)

#### Q


#### A


## 6, 7장.1 비동기 호출5~8)

#### Q


#### A

