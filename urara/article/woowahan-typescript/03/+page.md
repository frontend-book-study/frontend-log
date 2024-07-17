---
title: '3주차: 4장 타입 확장하기.좁히기 ~ 5장.3 타입 활용하기'
created: 2024-07-17
updated: 2024-07-17
tags:
  - '우아한타입스크립with리액트'
  - 'Frontend'
  - 'Study'
  - 'Book'
---

## 4.1 타입 확장하기

#### Q

#### A

## 4.2 타입 좁히기 - 타입 가드

#### Q1 
타입 가드란 무엇인가요? 타입스크립트에서 어떤 목적으로 사용되는지 설명해주세요.

#### A1
타입 가드는 런타임에 조건문을 사용하여 타입을 검사하고 타입 범위를 좁혀주는 기능을 말합니다.
주로 특정 문맥 안에서 타입스크립트가 어떠한 변수를 특정한 타입 X로 추론하도록 유도하는 경우에 주로 쓰입니다.

#### Q2 
아래 코드에서 convertToRange 함수는 selected 매개변수가 Date 타입인지 확인하여 Range 객체로 변환합니다. 주어진 코드를 바탕으로 instanceof 연산자를 사용하여 타입 가드를 적용하는 방법을 설명해주세요.

```typescript
interface Range {
    start: Date;
    end: Date;
}

export function convertToRange(selected?: Date | Range): Range | undefined {
    return selected instanceof Date
        ? { start: selected, end: selected }
        : selected;
}
```

instanceof 연산자는 인스턴스화된 객체 타입을 판별하는 타입 가드로 주로 사용됩니다. 
A instanceof B 형태로 사용되며 A의 프로토타입 체인에 생성자 B가 존재하는지를 검사하여 존재한다면 true, 그렇지 않다면 false를 반환합니다.

위 코드는 selected 객체의 프로토타입 체인에 Date가 존재한다면 { start: selected, end: selected }를 반환합니다.

#### A2

## 4.3 타입 좁히기 - 식별할 수 있는 유니온

#### Q

#### A

## 4.4 Exhaustiveness Checking으로 정확한 타입 분기 유지하기

#### Q

#### A

## 5.1 조건부 타입

#### Q

#### A

## 5.2 템플릿 리터럴 타입 활용하기

#### Q

#### A

## 5.3 커스텀 유틸리티 타입 활용하기

#### Q

#### A
