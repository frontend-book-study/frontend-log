---
title: '6주차: 8장.2 ~ 9장 훅 (268~305)'
created: 2024-08-07
updated: 2024-08-07
tags:
- '우아한타입스크립with리액트'
---

## 8.2 타입스크립트로 리액트 컴포넌트 만들기 ~ 8.3 정리(1)

#### Q


#### A


## 8.2 타입스크립트로 리액트 컴포넌트 만들기 ~ 8.3 정리(2)

#### Q


#### A


## 8.2 타입스크립트로 리액트 컴포넌트 만들기 ~ 8.3 정리(3)

#### Q


#### A


## 9.1 리액트 훅(1)

#### Q


#### A


## 9.1 리액트 훅(2)

#### Q


#### A


## 9.1 리액트 훅(3)

#### Q


#### A


## 9.2 커스텀 훅(1)

#### Q. useToggle 이라는 이름의 커스텀 훅을 만들어주세요. boolean 형태의 초깃값을 받으며, 현재 상태와 현재 상태를 토글하는 함수를 반환하는 인터페이스를 가져야 합니다.

```ts
const useToggle = (initialValue) => {
  // ...

  return { value, toggleValue }
}
```

#### A. boolean을 받아 useState의 초기값으로 사용하고, 실행할 때마다 이전 값의 반대로 상태를 바꾸는 toggleValue 함수를 만들어 반환합니다.

```ts
const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue)
  const toggleValue = () => setValue((prev) => !prev)

  return { value, toggleValue }
}
```

## 9.2 커스텀 훅(2)

#### Q


#### A


## 9.2 커스텀 훅(3)

#### Q1. 커스텀 훅 내부에서 리액트 컴포넌트를 반환할 수 있나요?
#### Q2. 다음 코드에서 'useInput'훅을 타입스크립트로 작성해주세요.
(시간관계상 책에 있는 예제를 봐주세요 p301)


#### A1. 

커스텀 훅 내부에서 직접적으로 반환할 수는 없습니다.
다만, 우회적으로 컴포넌트를 리턴할 수 있습니다.

```ts
import { useState } from "react";

const Component = () => {
  return <p>hi</p>;
};

const useReturnComponent = () => {
  const [_, setter] = useState(false);
  return {
    setter,
    component: Component,
  };
};

export default useReturnComponent;
```

#### A2.
```ts
import { useState, type ChangeEvent } from "react";

const useInput = (initialValue: string) => {
  const [value, setInput] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return { value, onChange };
};

export default useInput;
```
