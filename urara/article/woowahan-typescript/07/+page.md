---
title: '7주차: 10장 상태 관리 ~ 12장 타입스크립트 프로젝트 관리 (306~363)'
created: 2024-08-21
updated: 2024-08-21
tags:
- '우아한타입스크립with리액트'
---

## 10.1 상태 관리

#### Q. 아래 예제처럼 부모에게서 전달받을 수 있는 props이거나 기존 상태에서 계산될 수 있는 값은 상태가 아닙니다. 어떻게 하면 useEffect의 내부 데이터 동기화 이슈에도 걸리지 않고 사용할 수 있을까요?
```ts
import React, { useState } from 'react';

type UserEmailProps = {
  initialEmail: string;
};

const UserEmail: React.VFC<UserEmailProps> = ({ initialEmail }) => {
  const [email, setEmail] = useState(initialEmail); 
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  return (
    <div>
      <input type='text' value={email} onChange={onChangeEmail} />
    </div>
  );
};
```

#### A
email 상태에 대한 출처는 prop으로 바은 initailEmail과 useState로 생성한 것입니다. 두 출처 간의 데이터를 동기화하기보다는 단일한 출처에서 데이터를 사용하도록 변경해주면 됩니다. 방법은 UserEmail 컴포넌트에서 관리하던 상태를 부모 컴포넌트로 끌어올리면 됩니다.
```tsx
type UserEmailProps = {
  initialEmail: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const UserEmail: React.VFC<UserEmailProps> = ({ initialEmail, setEmail }) => {
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  return (
    <div>
      <input type='text' value={email} onChange={onChangeEmail} />
    </div>
  );
};


// 부모 컴포넌트
const 부모 = () => {
  const [ email, setEmail ] = useState(initialEmail);

  return (
    <div>
      <UserEmail initialEmail={email} setEmail={setEmail} />
    </div>
  );
}
```


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
타입스크립트 컴파일러에 타입 정보를 알려주는 declare 키워드를 효과적으로 활용할 수 있는 방법에는 무엇이 있을까요?


#### A
declare 키워드는 아래와 같이 효과적으로 활용할 수 있습니다.
1. declare type 활용
    - 보편적으로 많이 사용하는 커스텀 유틸리티 타입을 `declare type` 으로 선언하여 전역에서 사용할 수 있습니다.
```ts
declare type Nullable<T> = T | null;

const name: Nullable<string> = "woowa";
```
2. declare module 활용
    - CSS-in-JS 라이브러리를 사용할 때, theme의 인터페이스 타입을 확장하여 theme 타입이 자동으로 완성되도록 하는 기능을 추가할 수 있습니다.
```ts
declare module "styled-components" {
    type Theme = typeof theme;

    export interface DefaultTheme extends Theme {}
}
```
3. declare namespace 활용
    - Node.js 환경에서 .env 파일을 사용할 때, `declare namespace` 를 활용하여 `process.env` 로 설정값을 손쉽게 불러오고 환경변수의 자동 완성 기능을 쓸 수 있습니다.
```ts
declare namespace NodeJS {
    interface ProcessEnv {
        readonly API_URL: string;
        readonly API_INTERNAL_URL: string;
    }
}
```
4. declare global 활용
    - 전역 변수인 Window 객체의 스코프에서 사용되는 모듈이나 변수를 추가할 수 있습니다.
```ts
declare global {
    interface Window {
        newProperty: string;
    }
}
```

## 12.2 스크립트와 설정 파일 활용하기 ~ 12.3 타입스크립트 마이그레이션

#### Q tsconfig.json의 컴파일러 옵션에서 noEmit과 incremental 옵션에 대해 설명해주세요

#### A
#### noEmit 옵션
컴파일 시 자바스크립트로 된 출력 파일을 생성하지 않도록 설정하는 옵션입니다.

#### incremental 옵션
컴파일시에 증분 컴파일을 활성화 해 컴파일 시간을 단축할 수 있게 하는 옵션입니다.
  - **증분 컴파일**이란, 매번 모든 대상을 컴파일 하는 것이 아니라 변경 사항이 있는 부분만을 컴파일 하는 것을 뜻합니다. 모든 대상을 컴파일 하지 않아도 되기에 컴파일 타임을 줄일 수 있습니다. 

## 12.4 모노레포

#### Q 모노레포가 무엇인지 간단히 설명해주세요. 그리고, 모노레포를 사용할 경우의 장점과 단점을 각각 하나 이상 설명해주세요.

#### A 모노레포란 버전 관리 시스템에서 여러 프로젝트를 하나의 레포지토리로 통함하여 관리하는 소프트웨어 개발 전략입니다.

모노레포를 사용할 경우의 장점은 다음과 같습니다.
- 여러 프로젝트를 하나의 레포지토리로 통합관리하며, Lint, CI/CD 등 개발 환결 설정도 통합적으로 관리하기 때문에 불필요한 코드 중복을 줄일 수 있습니다.

모노레포를 사용할 경우의 단점은 다음과 같습니다.
- 시간이 지나면서 레포지토리가 거대해질 수 있습니다. 의존성 문제 등이 발생하기 쉬워져 오히려 퍼포먼스를 떨어뜨릴 수 있습니다.
