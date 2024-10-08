---
title: '2주차: 3장 고급 타입 (80~119)'
created: 2024-07-10
updated: 2024-07-10
tags:
- '우아한타입스크립with리액트'
---


## 3.1 타입스크립트만의 독자적 타입 시스템

### any타입, unknown 타입, void 타입

#### Q
1. any와 unknown의 차이점에 대해 알려주세요.
2. any와 unknown은 각각 어떤 상황일 때 사용하면 좋은지 타입 안정성과 관련지어 알려주세요.
3. 함수의 반환 타입으로 void를 사용하는 이유는 무엇인가요?
4. void와 undefined의 차이점은 무엇일까요?
#### A
1. any는 any타입에 어떤 타입이든 할당받을 수 있고 반대로 어떤 타입에라도 any타입을 할당 가능합니다. 반면 unknown은 unknown타입에 어떤 타입이든 할당받을 수 있는 것은 any와 동일하지만 any타입 외에 다른 타입에는 unknown타입을 할당할 수 없습니다.
2. 둘 다 개발 단계에서 임시로 값을 지정해야 할 때 사용할 수 있습니다. 하지만 나중에 any타입을 특정 타입으로 변경해야 한다는 것을 깜빡하고 누락할 수 있기 때문에 any사용을 지양하고 unknown 사용을 지향하는 것이 좋습니다.
3. 반환 값이 없기 때문에 함수 caller에게 반환값을 무시하라고 알려주기 위해 사용합니다.
4. void는 반환값이 없으니 무시하라는 뜻이고 undefined는 명시적으로 undefined를 반환한다를 의미합니다. 또한, void는 tsconfigd에서 strictNullChecks 옵션이 꺼져있다면 undefined 또는 null을 의미합니다.
### never 타입, Array 타입, enum 타입

#### Q1 타입스크립트에서 never는 값을 반환할 수 없는 타입을 말합니다. 
아래의 generateError 함수와 checkStatus 함수에 쓰인 never타입에 대해 설명해주세요.

```typescript
function generateError(res: Response): never {
  throw new Error(res.getMessage());
}

function checkStatus(): never {
  while (true) {
    // ...
  }
}
```

#### A1

- `generateError` 함수는 `throw` 키워드를 사용해 에러를 발생시키는 함수입니다. 에러를 던질 때에는 값을 반환하는 것으로 간주하지 않기 때문에 반환 타입이 `never`입니다.
- `checkStatus` 함수는 함수 내에서 while 문이 끝나지 않고 무한 루프로 실행되고 있습니다. 함수가 종료되지 않기 때문에 값을 반환하지 못해 never 타입입니다.

#### Q2 enum 타입과 const enum 타입의 차이점에 대해 설명해주세요.

#### A2 

- enum 타입은 열거형이라고도 부르는 타입스크립트 특수 타입으로, 일종의 구조체를 만드는 타입 시스템입니다. enum 타입은 주로 문자열 상수를 생성하는 데 사용됩니다. 역방향으로 접근하더라도 접근이 가능합니다. 타입스크립트 코드가 자바스크립트로 변환될 대 즉시실행함수(IIFE)로 변환되어 트리쉐이킹이 되지 않는 경우가 있습니다.
- const enum은 역방향으로의 접근을 허용하지 않는 열거형 선언 방식입니다. 자바스크립트에서의 객체에 접근하는 것과 유사합니다. 하지만 const enum으로도 숫자 상수로 관리되는 열거형은 접근을 방지하지 못하고, 문자열 상수로 관리해야 접근을 방지할 수 있습니다. const enum 또는 as const assertion 사용 시 트리쉐이킹이 발생하지 않도록 방지할 수 있습니다.

## 3.2 타입 조합

### 교차 타입, 유니온 타입

#### Q A 또는 B 타입을 만족하는 경우라면 유니온 타입으로 사용합니다. printItem이라는 함수에서 A | B 타입으로 받고 있고 다음과 같은 코드를 작성 후 에러가 발생합니다. 에러를 발생시키지 않으려면 코드를 어떻게 수정해야 할까요?

```typescript
type T = 'a' | 'b'
type A = {name: string; type: T}
type B = {name: string; imageUrl: string}

const printItem = (item: A | B) => {
  console.log(item.name)
  console.log(item.imageUrl)
  console.log(item.type)
}
```
#### A
A 또는 B 타입을 만족하는 경우이므로 교차 타입을 활용하는건 A,B 타입 모두 만족하는 매개변수를 전달해야하므로 조건에 부합하지 않았습니다. 
```typescript
type T = 'a' | 'b';
type A = { name: string; type: T };
type B = { name: string; imageUrl: string };

const printItem = (item: A & B) => {
    console.log(item.name);
    console.log(item.imageUrl);
    console.log(item.type);
};

//name, type, imageUrl을 모두 전달해야만 함.
printItem({ name: '', type: 'a' ,imageUrl:""});
//Argument of type '{ name: string; imageUrl: string; }' is not assignable to parameter of type 'A & B'.
//Property 'type' is missing in type '{ name: string; imageUrl: string; }' but required in type 'A'.ts(2345)
printItem({ name: 'HENA', imageUrl: '/src/image.png' });
```
그래서 item의 type이나 imageUrl이 A 또는 B 타입인지 확인하는 작업이 필요해보였습니다.
```typescript
type T = 'a' | 'b';
type A = { name: string; type: T };
type B = { name: string; imageUrl: string };

const printItem = (item: A | B) => {
    console.log(item.name);
    //item 객체가 type이라는 속성을 가지고 있는지 확인
    if('type' in item){
        //item이 A 타입인 것을 확인??
        console.log(item.type);
    }

    if('imageUrl' in item){
        console.log(item.imageUrl);
    }
};

printItem({ name: '', type: 'a'}); //OK
printItem({ name: 'HENA', imageUrl: '/src/image.png' }); //OK
```
item 객체가 type또는 imageUrl 속성을 가지고 있는지 확인하여 오류를 해결해보았습니다.

### 인덱스 시그니처, 인덱스 엑세스 타입

#### Q1. 인덱스 시그니처는 특정 타입의 속성 이름은 알 수 없지만, 속성값의 타입을 알고 있을 때 유용합니다 하지만 그만큼 한계점도 명확하게 존재하는데요 인덱스 시그니처의 한계점에는 무엇이 있을까요?
#### A1. 인덱스 시그니처를 선언할때는 다른 속성을 추가로 명시해 줄 수 있는데, 이때 추가로 명시된 속성이 인덱스 시그니처에 포함되는 타입이 아니면 에러가 발생합니다.

#### Q2.인덱스 엑세스 타입을 사용한 예시입니다 UserKeys에서 예상되는 타입을 답변해주세요
```
const user = { id: 1, name: 'John', age: 30 };
type UserKeys = keyof typeof user; // 예상되는 타입을 답변해주세요
```
#### A2.인덱스 엑세스 타입은 다른 타입의 특정 속성이 가지는 타입을 조회하기 위해 사용됩니다. 여기서 keyof 연산자는 객체 타입의 키들을 문자열 리터럴 유니온 타입으로 변환합니다. 따라서 UserKeys의 타입은 "id" | "name" | "age" 입니다.

### 맵드 타입, 템플릿 리터럴 타입, 제네릭

#### Q1
특정 타입의 제네릭만 허용하기 위해서는 어떠한 키워드를 사용해야 할까요? foo => T라는 제네릭은 string 또는 number 또는 boolean의 타입만 올 수 있다고 가정했을 때 지정해보세요.

#### A1
extends를 사용하여 특정 타입을 상속받아 상속 받은 타입의 제네릭만 허용할 수 있습니다
``` typescript
<T extends string | number | boolean>(arg: T)>(_: T) => T
```
#### Q2
제네릭의 장점을 간단하게 설명하고 쓰일 수 있는 부분을 설명해보세요.

#### A2
재네릭은 타입스크립트에서 다양한 타입 간에 재사용성을 높이기 위해 사용하는 문법입니다.
사용할 타입을 미리 정해두지 않고 실제로 사용할 때 외부에서 타입을 지정하여 사용하는 경우에 주로 사용합니다

#### Q
타입스크립트에서 반복적인 타입 선언을 효과적으로 줄일 수 있는 문법에 대해 설명해주세요.

#### A
타입스크립트에서 반복적인 타입 선언을 효과적으로 줄이기 위해 맵드 타입을 활용할 수 있습니다. 인덱스 시그니처 문법을 활용한 매핑을 통해 효율적인 방식으로 타입 선언을 할 수 있습니다.

#### Q 
타입스크립트에서 제네릭의 개념, 그리고 제네릭을 사용하면 어떤 장점이 있는지 설명해주세요.

#### A
타입스크립트 제네릭은 함수, 타입, 클래스 등에서 내부적으로 사용할 타입을 미리 정해두지 않고 타입 변수를 사용해 해당 위치를 비워둔 다음, 실제로 그 값을 사용할 때 외부에서 타입 변수 자리에 타입을 지정해 사용하는 방식입니다. 제네릭 사용시 다양한 타입을 받을 수 있어 재사용성이 크게 향상된다는 장점이 있습니다. 

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