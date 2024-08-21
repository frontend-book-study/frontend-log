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

#### Q


#### A


## 12.1 앰비언트 타입 활용하기

#### Q


#### A


## 12.2 스크립트와 설정 파일 활용하기 ~ 12.3 타입스크립트 마이그레이션

#### Q


#### A


## 12.4 모노레포

#### Q


#### A

