---
title: '11장 Next.js 13과 리액트 18'
created: 2024-05-21 12:00
updated: 2024-05-21 12:00
tags:
- '모던리액트DeepDive'
---

# 중요한 부분 정리

## app 디렉터리의 등장

13버전 이전까지는 모든 페이지는 가각 구별된 파일로 독립되어 있었다.
페이지를 공통으로 무언가를 집어넣을 수 있는 곳은 `_document`, `_app`이 유일하다.
- _document: 페이지에서 쓰이는, 태그를 수정하거나 서버 사이드 렌더링 시 `styled-components`와 같은 일부 CSS-in-JS를 지원하기 위한 코드를 삽입하는 제한적인 용도로 사용.
- _app: 페이지를 초기화하기 위한 용도로 사용되며 다음과 같은 작업이 가능
    - 페이지 변경 시에 유지하고 싶은 레이아웃
    - 페이지 변경 시 상태 유지
    - componentDidCatch를 활용한 에러 핸들링
    - 페이지간 추가적인 데이터 삽입
    - global CSS 주입

이전의 12버전까지는 페이지 공통 레이아웃을 유지할 수 있는 방법은 `_app`이 유일했다. 이러한 레이아웃의 한계를 극복하기 위해 나온 것이 Next.js의 app 레이아웃이다.

### 라우팅

- 기존에 `/pages`로 정의하던 라우팅 방식이 `/app` 디렉터리로 이동
- 파일명으로 라우팅하는 것이 불가능해졌다. 파일명은 무시되고 폴더명까지만 주소로 변환된다.
- 즉, 13의 app 디렉터리 내부의 파일명은 라우팅 명칭에 아무런 영향을 미치지 못한다.


## 리액트 서버 컴포넌트

### 기존 리액트 컴포넌트와 서버 사이드 렌더링의 한계

- 자바스크립트 번들 크기가 0인 컴포넌트를 만들 수 없다.
- 백엔드 리소스에 대한 직접적인 접근이 불가능하다.
- 자동 코드 분할이 불가능하다.
- 연쇄적으로 발생하는 클라이언트와 서버의 요청을 대응하기 어렵다.
- 추상화에 드는 비용이 증가한다.

서버 컴포넌트는 위와 같은 한계점을 극복하기 위해 등장했다.

### 서버 컴포넌트란?

하나의 언어, 하나의 프레임워크, 그리고 하나의 API와 개념을 사용하면서 서버와 클라이언트 모두에서 컴포넌트를 렌더링할 수 있는 기법을 의미한다. 서버에서 할 수 있는 일은 서버가 처리하게 두고, 서버가 할 수 없는 나머지 작업은 클라이언트인 브라우저엣에 수행된다.

> 주의해야할 점은 서버컴포넌트는 요청이 오면 그 순간 서버에서 딱 한 번 실행될 뿐ㅇ니므로 상태를 가질 수 없다. 그 말인 즉슨 useState, useReducer와 같은 리액트 생명주기 메서드나 훅을 사용할 수 없다는 뜻이다.

### 서버 컴포넌트는 어떻게 작동하는가?

1. 서버가 렌더링 요청을 한다.
    - 서버가 렌더링 과정을 수행해야 하므로 리액트 서버 컴포넌트를 사용하는 모든 페이지는 서버에서 시작된다.
    - 루트에 있는 컴포넌트는 항상 서버 컴포넌트다.
3. 서버는 받은 요청에 따라 컴포넌트를 JSON으로 직렬화한다.
    - 서버에서 렌더링할 수 있는 것은 직렬화해서 내보내고, 클라이언트 컴포넌트로 표시된 부분은 해당 공간을 플레이스홀더 형식으로 비워두고 나타낸다.
    - 브라우저는 이후에 이 결과물을 받아서 다시 역직렬화한 다음 렌더링을 수행한다
5. 브라우저가 컴포넌트 트리를 구성한다.
    - 트리를 구성했다면 구성한 트리를 바탕으로 렌더링해 브라우저의 DOM에 커밋한다.


## Next.js에서의 리액트 서버 컴포넌트

- Next.js의 루트 컴포넌트는 각 페이지에 존재하는 page.js이고, 루트 컴포넌트는 무조건 서버 컴포넌트가 된다.
- layout.js도 마찬가지로 서버 컴포넌트로 작동한다.

### 새로운 fetch 도입과 getServerSideProps, getStaticProps, getInitialProps의 삭제

- 과거 Next.js의 서버 사이드 렌더링과 정적 페이지를 제공을 위해 getServerSideProps, getStaticProps, getInitialProps가 `/app` 디렉터리 내부에서 삭제됐다.
- 그 대신 모든 데이터 요청은 웹에서 제공하는 표준 API인 `fetch`를 기반으로 이뤄진다.

### 정적 렌더링과 동적 렌더링

- 정적 라우팅에 대해서는 기본적으로 빌드 타임에 렌더링을 미리 해두고 캐싱해서 재사용할 수 있게끔 해두었다.
- 동적 라우팅에 대해서는 서버에 매번 요청이 올 때 마다 컴포넌트를 렌더링하도록 변경했다.

### 캐시와 mutating, 그리고 revalidating

- `fetch`의 기본 작동을 재정의해 `{next: {revalidate?: number | false}}`를 제공하는데, 이를 바탕으로 해당 데이터의 유효한 시간을 정해두고 이 시간이 지나면 다시 데이터를 불러와서 페이지를 렌더링하는 것이 가능하다.

### 스트리밍을 활용한 점진적인 페이지 불러오기

- 과거 서버 사이드 렌더링은 페이지가 다 불러와질 때까지 사용자는 빈화면을 보게 됐었다.
- 이를 해결하기 위해 하나의 페이지가 다 완성될 때까지 기다리는 것이 아니라 HTML을 작은 단위로 쪼개서 완성되는 대로 클라이언트로 점진적으로 보내는 스트리밍이 도입됐다.
- 스트리밍을 활용하면 모든 데이터가 로드될 때까지 기다리지 않더라도 먼저 데이터가 로드되는 컴포넌트를 빠르게 보여주는 방법이 가능하다.

## 웹팩의 대항마, 터보팩의 등장(beta)

- `Rome, SWC, esbuild`의 공통점은 기존에 자바스크립트로 만들어지고 제공되던 기능을 Rust나 Go를 사용해 제공함으로써 자바스크립트 대비 월등히 뛰어난 성능을 보여준다는 것이다.
- 특히 SWC는 Next.js를 만든 Vercel에서 제공하는 도구로, Next.js에서 안정화가 완료되어 많은 프로젝트에서 바벨을 대신해 사용하고 있다.
- Next.js 13에서는 터보팩(Turbopack)이 출시됐다. 웹팩 대시 최대 700배, Vite 대비 최대 10배 빠르다고 하며 러스트 기반으로 작성되었다.
    - 아직 베타이다.

## 서버 액션(alpha)

- API를 굳이 생성하지 않더라도 함수 수준에서 서버에 직접 접근해 데이터 요청 등을 수행할 수 있는 기능이다.
- 서버 컴포넌트와 다르게, 특정 함수 실행 그 자체만들 서버에서 수행할 수 있다는 장점이 있다.
- 반드시 async 함수여야 한다.
- `'use server'` 키워드를 사용해야 서버 액션으로 간주한다.

### form의 action

- `<form/>` 태그에 action props를 추가해서 양식 데이터를 추가할 URI를 넘겨줄 수 있다.
- 서버 액션으로 함수를 만들어 넘겨주면 submit 이벤트를 발생시키는 것을 클라이언트지만 실제로 함수 자체가 수행되는 것은 서버가 된다.
- url도 `/server-action/form`으로 요청되고, 페이로드에는 post 요청이 아닌 `ACTION_ID`라는 액션 구분자만 있는 것을 볼 수 있다.
- 서버 액션을 실행하면 클라이언트에서는 현재 라우트 주소와 `ACTION_ID`만 보내고 그 외에는 아무것도 실행하지 않는다.
    - 클라이언트 번들링 결과에는 포함되지 않고 서버에서만 실행되는 서버 액션을 만든 것이다.
- PHP와 같은 전통적인 서버 기반 웹 애플리케이션과 가장 큰 차이는 **페이지 새로고침 없이 수행된다**는 점이다.
- 데이터 스트리밍으로 이루어지기 때문에 클라이언트에서 새로운 결과를 받을 때까지 인터랙션을 구성할 수 있다.
- server mutation(서버에서의 데이터 수정)으로 실행할 수 있는 함수
    - `redirect`: 특정 주소로 리다이렉트 가능
    - `revalidatePath`: 해당 주소의 캐시를 즉시 업데이트. 새로운 데이터를 불러오는 역할.
    - `revalidateTag`: 캐시 태그는 fetch 요청 시에 추가 가능

### input의 submit과 image의 formAction

- `input type="submit"` 또는 `input type="image"`에 formAction prop으로도 서버 액션을 추가할 수 있다.

### startTransition과의 연동

- useTransition의 startTransition에서도 서버 액션 활용 가능하다.
- useTransition을 사용하면 page 단위의 `loading.jsx`를 사용하지 않고, isPending을 활용해 컴포넌트 단위의 로딩 처리가 가능해진다.

## 정리 및 주의사항

- 서버 컴포넌트는 파일 단위로 "use client"를 경계로 서버와 클라이언트 컴포넌트를 명확히 구분해야 하고, 나아가 라이브러리 또한 이 경계에 맞춰서 사용해야 하기 때문에 초기 개발 구조 설계에 큰 혼동이 있을 것으로 보인다.
- 리액트의 서버 컴포넌트는 이전에 없었던 완전히 새로운 패러다임이며 앞으로 리액트 생태계에 많은 변화를 가져올 것으로 보인다.

## 참고자료

- https://www.joshwcomeau.com/react/server-components/

# 회고

## Liked(좋았던 점)

- 웹 성능 지표에 대해 다시 한번 생각해볼 수 있어 좋았습니다.
- 서버 컴포넌트 사용하는 방식을 한 번에 볼 수 있었습니다.

## Learned(배웠던 점)

- 핵심 웹 지표로 꼽는 지표들에 대한 개념과 어떻게 개선할 수 있는 지를 알게 되었습니다.

## Lacked(아쉬운 점)

- 다음 시간에는 WebPageTest가 있는데 성능 테스트를 실습해 보아도 좋을 것 같습니다.
- 다음이 마지막 주차라 아쉽습니다..
