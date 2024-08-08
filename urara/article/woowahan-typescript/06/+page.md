---
title: '6주차: 8장.2 ~ 9장 훅 (268~305)'
created: 2024-08-07
updated: 2024-08-07
tags:
- '우아한타입스크립with리액트'
---

## 8.2 타입스크립트로 리액트 컴포넌트 만들기 ~ 8.3 정리(1)

#### Q 아래 코드에서 onChangeA는 에러가 발생하고 onChangeB는 에러가 발생하지 않는 이유는 무엇인가요?
```ts
interface Props<T extends string> {
  onChangeA?: (selected: T) => void;
  onChangeB?(selected: T): void;
}

const Component = () => {
  const changeToPineApple = (selectedApple: "apple") => {
    console.log("this is pine" + selectedApple);
  };

  return (
    <Select
      // Error
      // onChangeA={changeToPineApple}
      // OK
      onChangeB={changeToPineApple}
    />
  );
};
```

#### A 
위 코드에서 `onChangeA`는 **화살표 함수 타입 표기**를 사용해 타입을 정의하고 있는데, 이와같이 화살표 표기법으로 작성한다면 반공변성을 띠게됩니다.이 때문에 `onChangeA`에서는 --strict 모드에서 `changeToPineApple`함수의 매개변수 타입이 올바르게 인식되지 않아 에러가 발생합니다. 반면, `onChangeB`는 일반 함수 타입 표기를 사용하여 공변성과 반공변성을 모두 가지는 **이변성**을 가지므로 같은 상황에서 에러가 발생하지 않습니다.



## 8.2 타입스크립트로 리액트 컴포넌트 만들기 ~ 8.3 정리(2)

#### Q. 다음 코드에서 발생할 오류와 그 원인을 쓰고, 수정된 코드를 작성해주세요.
```tsx
import React, { useState } from 'react';

type Option = Record<string, string>;

interface SelectProps {
  options: Option;
  selectedOption?: string;
  onChange?: (selected?: string) => void;
}

const fruits = {
  apple: "사과",
  banana: "바나나",
  blueberry: "블루베리",
}

const FruitSelect = () => {
  const [fruit, changeFruit] = useState();

  return (
    <Select onChange={changeFruit} options={fruits} selectedOption={fruit}></Select>
  )
}

const Select = ({ options, selectedOption, onChange}: SelectProps) => {
  return (
    <div> Select Component </div>
  );
}
```


#### A
useState의 초기값으로 인해 fruit의 타입이 undefined로 추론되면서 onChange의 타입과 불일치 오류가 발생합니다. 따라서 아래와 같이 useState에 제네릭을 지정해주어 해결할 수 있습니다.
```tsx
type Fruit = keyof typeof fruits;
const [fruit, changeFruit] = useState<Fruit | undefined>();
```

## 9.1 리액트 훅(1)

#### Q1 useState에서 제네릭을 사용하여 얻을 수 있는 이점은 무엇이 있을까요?
#### A1 
useState에서 제네릭을 통해 상태 변수의 타입을 명시적으로 지정할 수 있어, 이후 코드에서 발생할 타입 오류를 방지할 수 있습니다. useState의 반환 튜플 두번째 요소인 Dispatch 타입 함수는 이전 상태 값을 받아 새로운 상태를 반환합니다. 제네릭을 통해 해당 Dispatch 타입 함수를 활용할 때 발생할 수 있는 예상치 못한 사이드 이펙트를 예방할 수 있습니다.

#### Q2 useEffect에서는 왜 비동기 함수를 호출할 수 없을까요?
#### A2 
useEffect에서 비동기 함수를 호출 가능할 경우, 경쟁 상태를 불러일으킬 수 있기에 useEffect의 callback 함수에는 비동기 함수가 들어갈 수 없습니다. 경쟁상태란, 멀티스레딩 환경에서 동시에 여러 프로세스나 스레드가 공유된 자원에 접근하려고 할 때 발생할 수 있는 문제입니다. 이러한 상황에서 실행 순서나 타이밍을 예측할 수 없게 되어 프로그램 동작이 원하지 않는 방향으로 흐를 수 있습니다.

#### Q3 useRef는 자식 컴포넌트를 저장하는 변수로 활용할 수 있을 뿐만 아니라 다른 방식으로도 유용하게 사용 할 수 있습니다. 어떤 방식이 있을까요?
#### A3 
1. useRef로 관리되는 변수는 값이 바뀌어도 컴포넌트의 리렌더링이 발생하지 않습니다. 이런 특성을 활용해 불필요한 리렌더링을 피할 수 있습니다.
2. useRef로 관리되는 변수는 값을 설정한 즉시 조회가 가능합니다.

## 9.1 리액트 훅(2)
리액트에서는 상태 사이드이펙트를 처리하기 위한 생명주기 훅인 useEffect와 useLayoutEffect를 제공하고 있습니다.

```jsx
const Component = () => {
  const [state, setState] = useState("");
  
  useLayoutEffect(() => {
    setState("blan19")
  }, [])
  
  useEffect(() => {
    setState("who?")
  }, [])

  return (
    <p>{state}</ p>
  );
};
```
#### Q1. 두 훅에서 발생하는 상태 변화에 대해서 설명해주세요.
#### A1. 컴포넌트가 처음 렌더링되면 state의 초기값은 ""입니다. 그리고 useLayoutEffect가 실행되어 state를 blan19로 설정합니다. 그 다음 useEffect가 실행되어 state를 "who?"로 설정합니다. 

#### Q2. 어느 부분에서 생명주기 차이점이 존재하는지 설명해주세요.
#### A2. useEffect는 componentDidUpdate와 같은 기존 생명주기 함수와는 다르게, 레이아웃 배치와 화면 렌더링이 모두 완료된 후에 실행됩니다. 반면 useLayoutEffect는 레이아웃 배치가 완료된 후에 실행됩니다. 따라서 useLayoutEffect를 통해 state가 빈값으로 뜨는 경우를 방지할 수 있습니다.


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
