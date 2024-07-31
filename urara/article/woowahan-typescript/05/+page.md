---
title: 5주차: 7장.2 비동기 호출 ~ 8장.1 JSX에서 TSX로 (218~267)
created: 2024-07-31
updated: 2024-07-31
tags:
- '우아한타입스크립with리액트'
---

## 7.2 API 상태 관리하기

#### Q


#### A


## 7.3 API 에러 핸들링(1)

#### Q


#### A

## 7.3 API 에러 핸들링(2)

#### Q


#### A


## 7.4 API 모킹 (1)

#### Q


#### A

## 7.4 API 모킹 (2)

#### Q


#### A


## 8.1 리액트 컴포넌트의 타입 (1)

#### Q 다음 코드는 클래스 컴포넌트와 함수 컴포넌트의 타입을 정의하는 예시입니다. 주어진 코드를 참고하여 클래스 컴포넌트와 함수 컴포넌트가 타입을 정의하는 방법에 대해 각각 설명해주세요.


#### A 클래스 컴포넌트는 React.Component를 확장하여 제네릭으로 props를 받아서 정의합니다. 또한 state 타입 또한 제네릭의 두번째 인자로 받아 정의할 수 있습니다. 함수 컴포넌트는 함수의 타입으로 React.FC 혹은 React.VFC 을 지정하여 정의합니다. 함수 컴포넌트 또한 제네릭을 사용하여 props를 받아 정의합니다.

#### Q 코드에서 사용된 React.FC와 React.VFC의 차이점은 무엇인가요?


#### A children props의 허용 여부 차이입니다. FC는 허용, VFC는 허용하지 않습니다.

```ts
// 클래스 컴포넌트의 타입 정의
interface WelcomeProps {
    name: string;
}

class Welcome extends React.Component<WelcomeProps> {}

// 함수 표현식을 사용한 방식 - React.FC
const Welcome: React.FC<WelcomeProps> = ({ name }) => {};

// 함수 표현식을 사용한 방식 - React.VFC
const Welcome: React.VFC<WelcomeProps> = ({ name }) => {};
```
## 8.1 리액트 컴포넌트의 타입 (2)

#### Q


#### A
