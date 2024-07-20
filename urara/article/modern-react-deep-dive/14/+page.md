---
title: '14장 웹사이트 보안을 위한 리액트와 웹페이지 보안 이슈'
created: 2024-06-04
updated: 2024-06-04
tags:
- '모던리액트DeepDive'
---

# 중요한 부분 정리

## 리액트에서 발생하는 크로스 사이트 스크립팅(XSS)

### dangerouslySetInnerHTML prop

- dangerouslySetInnerHTML은 특정 브라우저 DOM의 innerHTML을 특정한 내용으로 교체할 수 있는 방법이다.
- dangerouslySetInnerHTML은 오직 __html을 키를 가지고 있는 객체만 인수로 받을 수 있다.
- 이 인수로 넘겨받은 문자열을 DOM에 그대로 표시하는 역할을 한다. 그러나 dangerouslySetInnerHTML의 위험성은 인수로 받는 문자열에 제한이 없다는 것이다.
- 그래서 인수로 넘겨주는 문자열 값은 한 번 더 검증이 필요하다.

### 리액트에서 XSS 문제를 피하는 방법

- 가장 확실한 방법은 제 3자가 삽입할 수 있는 HTML을 안전한 HTML 코드로 한 번 치환하는 것이다.
- 이러한 과정을 새니타이즈(sanitize) 또는 이스케이프(escape)라고 한다.
- 유명한 라이브러리로 Dompurity, sanitize-html, js-xss가 있다.
- 단순히 보여줄 때 뿐만 아니라 사용자가 콘텐츠를 저장할 때도 한번 이스케이프 과정을 거치는 것이 더 효율적이고 안전하다. 그리고 이러한 치환 과정은 되도록 서버에서 수행하는 것이 좋다.
- 리액트에는 기본적으로 이스케이프 작업이 포함되어 있다.

## getServerSideProps와 서버 컴포넌트를 주의하자

- getServerSideProps가 반환하는 props 값은 모두 사용자의 HTML에 기록되고, 전역 변수로 등록되어 스크립트로 충분히 접근할 수 있는 보안 위협에 노출되는 값이 된다.
- 서버 컴포넌트가 클라이언트 컴포넌트에 반환하는 props에는 반드시 필요한 값으로만 철저하게 제한되어야 한다.


## `<a>`태그의 값에 적절한 제한을 둬야 한다

- `<a>` 태그의 href에 `javascript:`로 시작하는 자바스크립트 코드를 넣어둘 수 있다.
- URL로 페이지 이동을 막고 onClick 이벤트와 같이 이벤트 핸들러만 작동시키기 위한 용도로 사용된다.
- 마크업 관점에서 안티패턴이므로 페이지 이동 없이 핸들러만 작동하고 싶다면 `<button>` 태그를 사용하는 것이 좋다.
- href 내에 자바스크립트 코드가 존재한다면 이를 실행한다는 뜻이다.
- XSS 사례와 비슷하게 href에 임의의 주소를 넣을 수 있다면 보안 이슈로 이어질 수 있다. 따라서 값을 제한하고 origin을 확인해 처리하는 것이 좋다.

## HTTP 보안 헤더 설정하기

- HTTP 보안 헤더란 브라우저가 렌더링하는 내용과 관련된 보약 취약점을 미연에 방지하기 위해 브라우저와 함께 작동하는 헤더를 의미한다.
- 이는 웹사이트 보안에 가장 기초적인 부분으로, HTTP 보안 헤더만 효율적으로 사용할 수 있어도 많은 보안 취약점을 방지할 수 있다.

### 14.4.1 Strict-Transport-Security

- HTTP의 Strict-Transport-Security 응답 헤더는 모든 사이트가 HTTPS를 통해 접근해야 하며, 만약 HTTP로 접근하는 경우 이러한 모든 시도는 HTTPS로 변경되게 한다.

### 14.4.2 X-XSS-Protection

- X-XSS-Protection은 비표준 기술로, 현재 사파리와 구형 브라우저에서만 제공되는 기능이다.
- 이 헤더는 페이지에서 XSS 취약점이 발견되면 페이지 로딩을 중단하는 헤더다.

### 14.4.3 X-Frame-Options

- X-Frame-Options는 페이지를 frame, iframe, embed, object 내부에서 렌더링을 허용할지를 나타낼 수 있다.

### 14.4.4 Permissions-Policy

- Permissions-Policy는 웹사이트에서 사용할 수 있는 기능과 사용할 수 없는 기능을 명시적으로 선언하는 헤더다.

### 14.4.5 X-Content-Type-Options

- X-Content-Type-Options란 Content-type 헤더에서 제공하는 MIME 유형이 브라우저에 의해 임의로 변경되지 않게 하는 헤더다.
    - MIME란 Multipurpose Internet Mail Extensions의 약자로, Content-type의 값으로 사용된다.

### 14.4.6 Referrer-Policy

- Referrer-Policy 헤더는 이 Referer 헤더에서 사용할 수 있는 데이터를 나타낸다.

### 14.4.7 Content-Security-Policy

- 콘텐츠 보안 정책(Content-Security-Policy, 이하 CSP)은 XSS 공격이나 데이터 삽입 공격과 같은 다양한 보안 위협을 막기 위해 설계됐다.

## 취약점이 있는 패키지의 사용을 피하자

- npm 프로젝트는 수많은 패키지에 의존한다.
    - package.json: dependencies, devDependencies 패키지 명시
    - package-lock.json: package.json이 의존하는 패키지 명지
- 모든 의존성을 파악하는 것은 사실상 불가능하므로 깃허브의 Dependabot이 발편한 취약점은 필요하다면 빠르게 업데이트해 조치해야 한다.
- https://security.snyk.io/ 를 방문해 사용하는 패키지 이름을 검색해 패키지 보안 이슈를 추적한다.

## OWASP TOP 10

Open Worldwide web Application Security Project(오픈소스 웹 어플리케이션 보안 프로젝트)

- 웹에서 발생할 수 있는 정보 노출, 악성 스크립트, 보안 취약점 등 연구

1. Broken Access Control: 사용자가 자신의 권한 밖의 행동을 할 수 있는 취약점
2. Cyptographic Failures: 암호화 실패
3. Injection: XSS와 같이 사용자가 제공하는 데이터를 조작한 공격
4. Insecure Design: 코드 구현 단계가 아닌 기획 설계 단계에서 발생한 취약점
5. Security Misconfiguration: 애플리케이션 설정 시 잘못된 설정으로 인해 발생하는 취약점
6. Vulnerable and Outdated Component: 취약점이 있거나 지원이 종료된 소프트웨어를 사용하는 경우에 발생하는 보안 취약점
7. Identification and Authentication Failures: 인증 보안 취약점
8. Software and Data Integrity Failures
9. Security Logging and Monitoring Failures
10. Server-Side Request Forgery

## 정리

버그가 없는 완벽한 소프트웨어는 없다.
