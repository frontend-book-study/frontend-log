---
title: '2주차: 3장 고급 타입 (80~119)'
created: 2024-07-10
updated: 2024-07-10
tags:
  - '우아한타입스크립with리액트'
  - 'Frontend'
  - 'Study'
  - 'Book'
---


## 3.1 타입스크립트만의 독자적 타입 시스템

### any타입, unknown 타입, void 타입

#### Q

#### A

### never 타입, Array 타입, enum 타입

#### Q

#### A

## 3.2 타입 조합

### 교차 타입, 유니온 타입

#### Q

#### A

### 인덱스 시그니처, 인덱스 엑세스 타입

#### Q

#### A

### 맵드 타입, 템플릿 리터럴 타입, 제네릭

#### Q

#### A

## 3.3 제네릭 사용법

### 함수의 제네릭, 호출 시그니처의 제네릭, 제네릭 클래스

#### Q

#### A

### 제한된 제네릭, 확장된 제네릭, 제네릭 예시

#### Q
타입스크립트 제네릭의 장점은 다양한 타입을 받을 수 있게 함으로써 코드를 효율적으로 재사용 할 수 있도록 하는 데 있습니다. 그렇다면 제네릭은 실제 현업에서 어떠한 상황에 많이 활용될 지 작성해주세요. 그리고 타입 매개 변수에 제약조건을 설정하는 제한된 제네릭의 방법을 설명해주세요.

#### A
제네릭이 가장 많이 활용될 때는 API의 응답값을 지정할 때입니다. 아래와 같이 제네릭 타입 Data를 선언해두고 다양한 API의 응답 값의 타입에 MobileApiResponse를 활용해서 코드를 효율적으로 재사용할 수 있습니다.
```ts
export interface MobileApiResponse<Data> {
  data: Data;
  statusCode: string;
  statusMessage: string;
}
```

타입 매개 변수에 제약조건을 설정하기 위해서는 특정 타입을 상속(extends) 해야 합니다. 아래 코드처럼 타입 매개 변수가 특정 타입으로 묶였을 때 키를 바운드 타입 매개변수라고 부르며, string을 키의 상한 한계라고 부릅니다.
```ts
type ErrorRecord<Key extends string> = Exclude<Key, ErrorCodeType> extends never
  ? Partial<Record<Key, boolean>>
  : never;
```