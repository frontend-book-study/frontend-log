---
title: '4주차: 5장.4 타입 활용하기 ~ 7장.1 비동기 호출 (174~217)'
created: 2024-07-24
updated: 2024-07-24
tags:
- '우아한타입스크립with리액트'
---

## 0, 5.4 불변 객체 타입으로 활용하기

#### Q. 자바스크립트와 타입스크립트 각각에서 typeof 역할을 아래 예시를 바탕으로 설명해주세요.
```js
const colors = {
   black: '#000000',
   grey: '#222222'
}

# js 
console.log(typeof colors) 

# ts
type ColorType = typeof colors;
const myFavoriColors : ColorType= {
  black: 'first',
  grey: 'second'
}
```


#### A
자바스크립트에서 typeof는 타입을 추출하기 위한 연산자로 사용됩니다. 따라서 typeof colors의 결과는 "object"가 됩니다.
타입스크립트에서는 typeof가 변수 혹은 속성의 타입을 추론하는 역할을 합니다. 예시에서 ColorType은 아래와 같이 추론되며,
```
{
  black: string;
  grey: string;
}
```
myFavoriColors 객체가 위와 같은 타입을 가져야 함을 의미합니다. 


## 1, 5.5 Record 원시 타입 키 개선하기

#### Q


#### A


## 2, 6.1 자바스크립트의 런타임과 타입스크립트의 컴파일

#### Q 컴파일타임과 런타임의 차이를 설명해 주세요.


#### A 컴파일 타임은 소스코드가 컴파일러에 의해 기계어 코드로 변환되어 실행 가능한 프로그램이 되는 단계를 의미하며, 런타임은 컴파일 과정을 마친 프로그램이 메모리에 적재되어 실행되는 단계를 말합니다.


#### Q 타입스크립트 컴파일러는 소스코드를 컴파일하여 프로그램이 실행되도록 자바스크립트 코드로 변환합니다. 이 과정 중에서 타입을 확인하는 단계는 언제인가요? 타입을 확인할 때 어떤 에러를 감지할 수 있는지도 예시를 들어 주세요.


#### A 타입 검사기가 AST를 확인하여 타입을 확인 할 때(체커 단계) 입니다. 예를 들어 문법 오류가 발생했을 경우 "Unexpected token." 과 같은 에러를 감지 할 수 있습니다.


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

#### Q1. Fetch와 Axios의 차이는 무엇인가요?

#### A1. Fetch는 브라우저에 내장된 API이고, Axios는 브라우저와 Node.js에서 사용할 수 있는 라이브러리입니다. 

Fetch는 내장 라이브러리이기 때문에 따로 임포트하거나 설치할 필요 없이 사용할 수 있습니다. 그러나 많은 기능을 사용하려면 직접 구현해서 사용해야 합니다.

Axios는 API 정책에 따라 인스턴스를 다양하게 구성할 수 있습니다. 또한, 요청과 응답을 인터셉트할 수 있는 기능을 제공합니다. 

#### Q2. Axios Intercepter 기능을 사용하면 어떤 처리가 가능해지나요?

#### A2. Axios Intercepter 기능을 사용하면 header 를 설정하는 기능을 넣거나 에러를 처리할 수 있습니다.

```typescript
import config = require("tailwindcss/defaultConfig");

const instance = axios.create({
    baseURL: 'https://api.example.com'
});
instance.interceptors.request.use(
    (config) => {
        config.headers = {
            ...config.headers,
            "Content-Type": "application/json",
        }
    return config;},
    (error) => {
        return Promise.reject(error);
    }
);
```

빌더 패턴(객체 생성을 더 편리하고 가독성 있게 만들기 위한 디자인 패턴 중 하나)을 사용해 API를 호출하기 위한 래퍼를 빌더 패턴을 만들 수 있습니다.

```typescript
const fetch = async (name?: string) => {
    const api = new ApiBuilder()
        .setUrl('https://api.example.com')
        .setMethod('GET')
        .setPath('/api')
        .setParams({ name })
        .build();
}
```

## 6, 7장.1 비동기 호출5~8)

#### Q


#### A

