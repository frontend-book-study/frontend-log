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

#### Q

#### A

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
아래와 같이 PhoneNumberType을 설정할 경우 Expression produces a union type that is too complex to represent. 에러가 발생합니다. 에러가 나지 않도록 하려면 어떻게 사용하는 것이 좋을까요?

```typescript
type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type Chunk = `${Digit}${Digit}${Digit}${Digit}`
type PhoneNumberType = `010-${Chunk}-${Chunk}`
```

#### A
정규표현식을 사용해 해결할 수 있습니다.

## 5.3 커스텀 유틸리티 타입 활용하기

#### Q
하나의 속성을 가진 Card, Account을 유니온 타입으로 받는 함수가 있습니다. 합집합으로도 들어올 수 있는 파라미터를 하나의 속성만 허용하도록 PickOne 커스텀 유틸리티 타입을 단계 별로 작성해 주세요.

```typescript
type Card = { card: string }
type Account = { account: string }
```

#### A
type One<Card> = { card: { card: string } }['card']으로 type One<Card> = { card: string }입니다. 
type One<Account> = { account: { account: string } }['account']으로 type One<Account> = { card: string }입니다. 

type ExcludeOne<Card> = { card: Partial<Record<never, undefined>> }['card']으로 type ExcludeOne<Card> = {}입니다.
type ExcludeOne<Account> = { account: Partial<Record<never, undefined>> }['account']으로 type ExcludeOne<Account> = {}입니다.

type One<Card | Account> = { card: { card: string } } | { account: { account: string } };이고
type ExcludeOne<Card | Account> = { card: Partial<Record<Exclude<'card' | 'account', 'card'>, undefined>> } | { account: Partial<Record<Exclude<'card' | 'account', 'account'>, undefined>> };이므로,

type PickOne<Card | Account> = 
  | ({ card: string } & { account?: undefined })
  | ({ account: string } & { card?: undefined });입니다.
