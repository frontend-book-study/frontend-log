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

#### Q


#### A


## 9.2 커스텀 훅(2)

#### Q


#### A


## 9.2 커스텀 훅(3)

#### Q


#### A
