---
title: '7주차: 10장 상태 관리 ~ 12장 타입스크립트 프로젝트 관리 (306~363)'
created: 2024-08-21
updated: 2024-08-21
tags:
- '우아한타입스크립with리액트'
---

## 10.1 상태 관리

#### Q


#### A


## 10.2 상태 관리 라이브러리

#### Q


#### A


## 11 CSS in JS

#### Q1

CSS in JS의 가장 큰 장점을 무엇이라고 생각하시나요?

#### A1

여러 장점들이 존재하겠지만, 제가 생각하는 CSS in JS의 가장 큰 장점은 CSS 스타일을 리액트 컴포넌트 레이어로 추상화 가능하다는 것 입니다.
이로인해 스타일 재사용 및 모듈화가 가능해져 유지보수가 용이합니다.

#### Q2 

아래 코드에서 %%% 에 들어갈 코드는 무엇일까요?

```tsx
export const Container = styled.div<{ %%% }>`
    margin: 24px;
    border: 1px solid #FFF;
    border-radious: 8px;
    display: ${ props => props.isHidden ? "none" : "inline-block" };
    font-weight: ${ props => props.isBold ? "700" : "400" };
`;
```

#### A2

```tsx
interface StyledProps {
  isHidden: boolean;
  isBold: boolean;
}

export const Container = styled.div<StyledProps>`
    margin: 24px;
    border: 1px solid #FFF;
    border-radious: 8px;
    display: ${ props => props.isHidden ? "none" : "inline-block" };
    font-weight: ${ props => props.isBold ? "700" : "400" };
`;
```

## 12.1 앰비언트 타입 활용하기

#### Q


#### A


## 12.2 스크립트와 설정 파일 활용하기 ~ 12.3 타입스크립트 마이그레이션

#### Q


#### A


## 12.4 모노레포

#### Q


#### A

