---
title: '10장 리액트 17과 18의 변경 사항 살펴보기'
created: 2024-05-21
updated: 2024-05-21
tags:
- 'Frontend'
- 'Study'
- 'Book'
---

# 중요한 부분 정리

## 리액트 17 버전 살펴보기

- 16버전과 다르게 새롭게 추가된 기능이 없으며 호환성이 깨지는 변경사항, 즉 기존에 사용하던 코드의 수정을 필요로 하는 변경 사항을 최소화했다.

### 점진적인 업그레이드

- 리액트 17버전부터 점진적인 업그레이드가 가능해진다. 리액트 17버전 내부에서 리액트 16을 게으르게 (lazy) 불러온다.

### 이벤트 위임 방식의 변경

- 리액트는 이벤트 핸들러를 각각의 DOM 요소에 추가하지 않는다. 이벤트 타입당 하나의 핸들러를 루트에 부착한다.(이벤트 위임)
- 리액트 16버전까지는 모두 document에서 이벤트 위임이 이루어졌다. 리액트 17 버전부터 리액트 컴포넌트 최상단 트리, 즉 루트 요소로 바뀌었다.(div#root)
- 점진적인 업그레이드 지원, 다른 바닐라 코드, jQuery 등 혼재되어 있는 경우 혼란 방지를 위해서다.

### import React from 'react'가 더 이상 필요 없다: 새로운 JSX transform

- JSX는 바벨이나 타입스크립트를 활용해 일반 자바스크립트로 변환하는 과정이 필요하다.
- 리액트 17부터 JSX를 변환할 때 react/jsx-runtime을 불러오는 require 구문도 같이 추가되므로 import React from 'react'를 작성하지 않아도 된다.

### 그 밖의 주요 변경 사항

- 이벤트 풀링 제거(이벤트 풀링: SyntheticEvent 풀을 마니들어서 이벤트가 발생할 때마다 가져오는 것)
- useEffect 클린업 함수의 비동기 실행(컴포넌트의 커밋 단계가 완료될 때까지 지연)
- 컴포넌트의 undefined 반환에 대한 일관적인 처리(리액트 17: undefined 반환하는 경우 에러 발생, 리액트 18: undefined 반환해도 에러 발생하지 않음)

## 리액트 18 버전 살펴보기

### useId

- 컴포넌트별로 유니크한 값을 생성하는 새로운 훅이다.

### useTransition

- UI 변경을 가로막지 않고 상태를 업데이트할 수 있는 리액트 훅이다.
- 이를 활용하면 업데이트를 긴급하지 않은 것으로 간주해 무거운 렌더링 작업을 조금 미룰 수 있으며, 사용자에게 조금 더 나은 사용자 경험을 제공할 수 있다.
- 리액트 18의 변경 사항의 핵심 중 하나인 '동시성(concurrency)'을 다룰 수 있는 새로운 훅이다.

### useDeferredValue

- 리액트 컴포넌트 트리에서 리렌더링이 급하지 않은 부분을 지연할 수 있게 도와주는 훅이다.
- 디바운스는 고정된 지연 시간을 필요로 하지만 useDeferredValue는 고정된 지연 시간 없이 첫 번째 렌더링이 완료된 이후에 useDeferredValue로 지연된 렌더링을 수행한다.
    - 이 지연된 렌더링은 중단할 수도 있으며, 사용자의 인터랙션을 차단하지도 않는다.

### useSyncExternalStore

- useSubscription의 구현이 리액트 18에 이르러서 useSyncExternalStore로 대체되었다.
- 테어링(tearing)
    - 리액트에서는 하나의 state 값이 있음에도 서로 다른 값(보통 state나 props의 이전과 이후)을 기준으로 렌더링되는 현상을 말한다.
    - 리액트 18에서는 useTransition, useDeferredValue의 훅처럼 렌더링을 일시 중지하거나 뒤로 미루는 등의 최적화가 가능해지면서 동시성 이슈가 발생할 수 있다.
- 외부 데이터 소스에 리액트에서 추구하는 동시성 처리가 추가돼 있지 않다면 테어링 련상이 발생할 수 있다. 이 문제를 해결하기 위한 훅이 useSyncExternalStore다.

### useInsertionEffect

- CSS-in-JS 라이브러리를 위한 훅이다.
- DOM이 실제로 변경되기 전에 동기적으로 실행된다. 이 훅 내부에 스타일을 삽입하는 코드를 집어넣음으로써 브라우저가 레이아웃을 계산하기 전에 실행될 수 있게끔 해서 좀 더 자연스러운 스타일 삽입이 가능해진다.

### react-dom/client

#### createRoot

- 기존의 react-dom에 있던 render 메서드를 대체할 새로운 메서드다.

#### hydrateRoot

- 서버 사이드 렌더링 애플리케이션에서 하이드레이션을 하기 위한 새로운 메서드다.

### react-dom/server

#### renderToPipableStream

- 리액트 컴포넌트를 HTML로 렌더링하는 메서드다.
- 스트림을 지원하는 메서드로, HTML을 점진적으로 렌더링하고 클라이언트에서는 중간에 script를 삽입하는 등의 작업을 할 수 있다.

#### renderToReadableStream

- renderToPipableStream이 Node.js 환경에서의 렌더링을 위해 사용된다면, renderToReadableStream은 웹 스트림(web stream)을 기반으로 작동한다는 차이가 있다.
- 서버 환경이 아닌 클라우드플레어(Cloudflare)나 디노(Deno) 같은 웹 스트림을 사용하는 모던 엣지 런타임 환경에서 사용되는 메서드다.

### 자동 배치(Automatic Batching)

- 리액트가 여러 상태 업데이트를 하나의 리렌더링으로 묶어서 성능을 향상시키는 방법을 의미한다.
- 리액트 17 버전 이하의 과거 버전의 경우, 이벤트 핸들러 내부에서는 자동 배치 작업이 이뤄지고 있었지만 Promise, setTimeout 같은 비동기 이벤트에서는 자동 배치가 이뤄지지 않았다.
- 리액트 18 버전부터는 루트 컴포넌트를 createRoot를 사용해서 만들면 모든 업데이트가 배치 작업으로 최적화할 수 있게 됐다.


## 더욱 엄격해진 엄격 모드

### 리액트의 엄격 모드

> 애플리케이션에서 발생할 수 있는 잠재적인 버그를 찾을 수 있도록 도움이 되는 컴포넌트

- 더 이상 안전하지 않은 특정 생명주기(`componentWillMount, componentWillReceiveProps, componentWillUpdate`)를 사용하는 컴포넌트에 대한 경고
- 문자열 ref 사용 금지(createRef, useRef 사용)
- findDOMNode에 대한 경고 출력(
    - findDOMNode: 클래스형 컴포넌트 인스턴스에서 실제 DOM 요소에 대한 참조를 가져올 수 있는, 현재는 사용하는 것이 권장되지 않는 메소드
    - 문제점: 부모가 특정 자식만 별도로 렌더링하는 것이 가능해짐, 변경 사항을 추적할 수 없음.
- 구 Context API(childContextTypes, getChildContext) 사용 시 발생하는 경고
- 예상치 못한 부작용(side-effect) 검사
    - 엄격 모드에서 의도적으로 이중 호출한다. (순수한 결과물을 항상 내고 있는지 확인시키기 위함)

## Suspense 기능 강화

- lazy와 Suspense는 한 쌍으로 사용됐고, 컴포넌트를 분할해 초기 렌더링 속도를 향상시키는 데 많은 도움을 줬다.
- 리액트 18 버전에서는 Suspense가 정식 단계를 지원한다.
    - 아직 마운트되기 전에도 effect가 빠르게 실행되는 문제가 수정됐다.
    - Suspense로 인해 컴포넌트가 보이거나 사라질 때도 effect가 정상적으로 실행된다.
    - Suspense를 서버에서도 실행할 수 있다.
    - Suspense 내에 스로틀링이 추가됐다.

## 참고자료

- https://goidle.github.io/react/in-depth-react18-lane/
- https://www.joshwcomeau.com/react/use-deferred-value/
- https://tkdodo.eu/blog/avoiding-hydration-mismatches-with-use-sync-external-store


# 회고

## Liked(좋았던 점)

- 오늘도 흥미로운 인사이트 얻어가는 것 같아요~
- 리액트 18에 등장한 새로운 기능들을 자세히 알게 된 것 같습니다.

## Learned(배웠던 점)

- 아리송했던 서버컴포넌트에 대해 부족했던 점을 채울 수 있었습니다
- 잘 몰랐었던 React 18의 새로운 훅들을 배울 수 있어 좋았습니다

## Lacked(아쉬운 점)

- 마지막까지 긴장을 놓칠 수 없다.. 비슷한 분량이었지만 어려운 내용이 많았다.

## Longed for(개선점)

- 분량 조절
