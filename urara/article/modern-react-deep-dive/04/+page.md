---
title: '4장 서버 사이드 렌더링'
created: 2024-04-16 12:00
updated: 2024-04-16 12:00
tags:
- 'Frontend'
- 'Study'
- 'Book'
---

# 중요한 부분 정리

## 1. 서버 사이드 렌더링이란?

서버 사이드 렌더링(SSR)은 최초에 사용자에게 보여줄 페이지를 서버에서 렌더링해 빠르게 사용자에게 화면을 제공한다

> 클라이언트 사이드 렌더링(CSR)은 최초 사용자에게 빈 화면을 보여주며 자바스크립트 번들 로드가 완료되면 채워진 화면을 제공한다.

### 장점

1. 최초 페이지 진입이 비교적 빠르다
2. 검색 엔진과 SNS 공유 등 SEO에 강점을 가진다
3. 누적 레이아웃 이동이 적다
4. 사용자 디바이스 제약에 비교적 자유롭다
5. 보안에 좀 더 안전하다

### 단점

1. 소스코드를 작성할 때 항상 서버를 고려해야한다
2. 적절한 서버가 존재해야한다
3. 서비스 지연에 따른 문제가 존재한다

현대의 서버 사이드 렌더링을 제공하는 프레임워크들은 SSR과 CSR의 장점을 모두 취한 방식으로 동작한다.

## 2. 서버 사이드 렌더링을 위한 리액트 API 살펴보기

### 1. renderToString

- 인수로 넘겨받은 리액트 컴포넌트를 렌더링해 HTML 문자열로 반환하는 함수
- 서버 사이드 렌더링을 구현하는 데 가장 기초적인 API로, 최초의 페이지를 HTML로 먼저 렌더링하는 역할
- 클라이언트에서 실행되지 않고 일단 먼저 완성된 HTML을 서버에서 제공할 수 있으므로 초기 렌더링에서 뛰어난 성능을 보인다.
- `div#root`에 존재하는 속성인 `data-reactroot` 속성은 리액트 컴포넌트의 루트 엘리먼트가 무엇인지 식별하는 역할을 한다. hydrate 함수에서 루트를 식별하는 기준점이 된다.

### 2. renderToStaticMarkup

- `renderToStaticMarkup`은 `renderToString`과 유사하게 리액트 컴포넌트를 기준으로 HTML 문자열을 만든다는 점에서 동일하다.
- 한 가지 차이점은 `renderToStaticMarkup`은 추가적인 DOM 속성을 만들지 않는다는 점이다. 따라서 결과물인 HTML의 크기를 아주 약간이라도 줄일 수 있다는 장점이 있다.

### 3. renderToNodeStream

- `renderToNodeStream`은 `renderToString`과 결과물이 완전히 동일하지만 브라우저에서 사용하는 것이 불가능하다. 완전히 Node.js 환경에 의존하고 있다.
- `renderToNodeStream`의 결과물은 Node.js의 ReadableStream이다. (ReadableStream은 utf-8로 인코딩된 바이트 스크림으로 Node.js나 Deno 같은 서버 환경에서만 사용 가능)

### 4. renderToStaticNodeStream

- `renderNodeStream`과 제공하는 결과물은 동일하나, `renderToStaticMarkup`과 마찬가지로 리액트 자바스크립트에 필요한 리액트 속성이 제공되지 않는다.
- `hydrate`를 할 필요가 없는 순수 HTML 결과물이 필요할 때 사용하는 메서드다.

### 5. hydrate
- hydrate: `renderToString`과 `renderToNodeStream`으로 생성된 HTML 콘텐츠에 자바스크립트 핸들러나 이벤트를 붙이는 역할
- render: 컴포넌트와 HTML 요소를 받아 HTML 요소에 해당 컴포넌트 렌더링 + 이벤트 핸들러 붙이는 작업까지 한 번에 처리

#### hydrate, render 차이점
- `hydrate`는 이미 렌더링된 HTML이 있다는 가정하에 작업이 수행됨
- 렌더링된 HTML을 기준으로 이벤트를 붙이는 작업만 실행

#### hydrate의 두 번째 인자에 리액트 관련 정보가 없는 순수한 HTML 정보를 넘겨주면?
- `hydrate`는 서버에서 제공해준 HTML이 클라이언트의 결과물과 같을 것이라는 가정하에 실행
- 서버에서 렌더링한 정보가 없기 때문에 경고 노출
- 에러가 발생해도 리액트는 정상적으로 웹페이지를 노출함
    - 이유: `hydrate` 작업에 렌더링을 한 번 수행하면서 `hydrate`가 수행한 렌더링 결과물 HTML과 인수로 넘겨받은 HTML을 비교하는 과정을 수행하기 때문
    - but, 이렇게 렌더링하는 것은 사실상 클라이언트에서 두 번 렌더링하게 되고, 결국 서버 사이드 렌더링의 장점을 포기하는 것

## 3. Next.js 톺아보기

### pages/_app.tsx
- _app.tsx는 Next.js를 초기화하는 파일로, Next.js 설정과 관련된 코드를 모아두는 곳이며, 경우에 따라 서버와 클라이언트 모두에서 렌더링될 수 있다.

### pages/_document.tsx
- _document.tsx는 Next.js로 만드는 웹사이트의 뼈대가 되는 HTML 설정과 관련된 코드를 추가하는 곳이며, **반드시 서버에서만 렌더링된다.**
- 이벤트 핸들러를 추가할 수 없다. -> 이벤트를 추가하는 것은 클라이언트에서 실행되는 `hydrate`의 몫이기 때문

### getStaticPaths와 getStaticProps
- 이 두 함수는 어떠한 페이지를 CMS(Contents Management System)나 블로그, 게시판과 같이 사용자와 관계없이 정적으로 결정된 페이지를 보여주고자 할 때 사용하는 함수다.

### getServerSideProps
- 서버에서 실행되는 함수이며 해당 함수가 있다면 무조건 페이지 진입 전에 이 함수를 실행한다.

### getInitialProps
- getInitialProps는 getStaticProps나 getServerSideProps가 나오기 전에 사용할 수 있었던 유일한 페이지 데이터 불러오기 수단이었다. 대부분의 경우에는 getStaticProps나 getServerSideProps를 사용하는 것을 권장하며, getInitialProps는 굉장히 제한적인 예시에서만 사용된다.

# 회고

## Keep (현재 만족하고 있는 부분)

- 스터디 덕에 꾸준히 책을 읽고 정리할 수 있어서 좋은 것 같다.
- 현업에서의 얘기들을 해볼 수 있어서 좋습니다!
- 각자 프로젝트 혹은 현업에서 사용하고 있는 도구들에 대해서 공유하고 의견 나눌 수 있어 좋았습니다!

## Problem (개선이 필요한 부분)

- 개인적으로 글 읽는 속도가 매우 느려.. 시간을 더 내서 읽어와야할 것 같다.(저도..)
- 예시 코드가 많거나 참여인원이 적은 경우 정리시간이 더 길어야 할 것 같다.
- 예제 코드는 속독이 잘 안 되는 것 같습니다.
- 생소한것들이 많아 읽는데 오래걸려 미리 조금 읽고 와야 할 것 같다..

## Try (해결책)

- 공유하기 시간에 생소하거나 어려운 부분에 대한 얘기를 한다.
- 미리 읽어오기? 빨리 읽기?
- 스터디 시작 전마다 시간 조정하기