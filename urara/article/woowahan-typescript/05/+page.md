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

#### Q


#### A

## 8.1 리액트 컴포넌트의 타입 (2)

#### Q
리액트의 함수형 컴포넌트에서 DetailedHTMLProps를 사용할 때, ref를 props로 받을 경우 고려해야 할 사항이 존재합니다. <br>

Q1. 무엇을 고려해야 하는지 알려주세요 <br>
Q2. ComponentPropsWithoutRef 타입에 대해서 간략히 설명해주세요.

#### A
A1. <br>
- `DetailedHTMLProps`를 사용해 함수형 컴포넌트의 props로 ref를 받으면, 실제로는 동작하지 않는 ref를 받도록 타입 지정되어 예기치 않은 에러가 발생할 수 있습니다. 클래스 컴포넌트의 경우 ref 객체는 마운트된 컴포넌트의 인스턴스를 current 속성값으로 가지기 때문에 ref가 정상 작동합니다. 하지만 함수형 컴포넌트에서는 생성된 인스턴스가 없기 때문에 ref에 기대한 값이 할당되지 않습니다.
- 함수형 컴포넌트에서 이러한 제약을 극복하기 위해, `React.forwardRef`를 사용하여 ref를 전달 받도록 구현할 수 있습니다.
<br>
A2. <br>

`ComponentPropsWithoutRef<"button">`를 예로 들어 설명하겠습니다. 이 경우, button 태그에 대한 HTML 속성은 모두 포함되지만, ref 속성은 모두 제외됨을 의미합니다. 즉, `ComponentPropsWithoutRef`는 ref 속성을 포함하지 않는 타입입니다.
