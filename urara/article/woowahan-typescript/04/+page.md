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

