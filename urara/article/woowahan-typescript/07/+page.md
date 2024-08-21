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

#### Q 모노레포가 무엇인지 간단히 설명해주세요. 그리고, 모노레포를 사용할 경우의 장점과 단점을 각각 하나 이상 설명해주세요.

#### A 모노레포란 버전 관리 시스템에서 여러 프로젝트를 하나의 레포지토리로 통함하여 관리하는 소프트웨어 개발 전략입니다.

모노레포를 사용할 경우의 장점은 다음과 같습니다.
- 여러 프로젝트를 하나의 레포지토리로 통합관리하며, Lint, CI/CD 등 개발 환결 설정도 통합적으로 관리하기 때문에 불필요한 코드 중복을 줄일 수 있습니다.

모노레포를 사용할 경우의 단점은 다음과 같습니다.
- 시간이 지나면서 레포지토리가 거대해질 수 있습니다. 의존성 문제 등이 발생하기 쉬워져 오히려 퍼포먼스를 떨어뜨릴 수 있습니다.
