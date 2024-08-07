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

#### Q


#### A


## 9.2 커스텀 훅(2)

#### Q


#### A


## 9.2 커스텀 훅(3)

#### Q


#### A
