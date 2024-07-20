---
title: '9장 모던 리액트 개발 도구로 개발 및 배포 환경 구축하기'
created: 2024-05-07 12:00
updated: 2024-05-07 12:00
tags:
- '모던리액트DeepDive'
---

# 중요한 부분 정리

## Next.js로 리액트 개발 환경 구축하기

- 실무에서 일하다보면 생각보다 처음부터 서비스를 만들어보는 일이 그다지 많지 않다.
- 그러나 아무것도 없는 상태에서 프로젝트의 기반을 다지는 일은 생각보다 중요하므로 꼭 알아둬야 한다.
- create-react-app, create-next-app으로 어플리케이션 구축을 손쉽게 할 수 있지만 create-react-app은 더 이상 유지보수되지 않을 가능성이 크다.
- 그러므로 우리는 create-react-app 없이 리액트 프레임워크를 구축하는 방법을 공부해 둘 필요가 있다.

### create-react-app 없이 하나씩 구축하기

- package.json 만들기 `=>` `npm init`
- Next.js `<=` `react`, `react-dom`, `next` 설치
- devDependencies
    - `typescript`
    - `@types/react`, `@types/react-dom`: typescript 내부에서 react 타입 지원
    - `@types/node`: Node.js 타입 지원
    - `eslint`, `eslint-config-next`: Eslint 사용에 필요

### tsconfig.json 작성하기

- `tsconfig.json` 작성하기 전에, JSON 최상단에 $schema키와 "https://json.schemastore.org/tsconfig.json" 값을 넣어놓기
    - 해당 JSON 파일이 무엇을 의미하는지, 어떤 키와 어떤 값이 들어갈 수 있는지 알려주는 도구

### next.config.js 작성하기

- Next.js 설정을 위한 옵션을 루트 경로의 next.config.js에서 원하는 옵션을 활성화 시킬 수 있음

### 애플리케이션 코드 작성

- 보일러 프로젝트 `=>` Github "Template repository" 옵션 체크 후 템플릿 저장소로 만들어두면 다른 저장소 생성 시 이 내용을 모두 복사해서 사용 가능함

## 깃허브 100% 활용하기

- https://github.com/frontend-book-study/modern-react-deep-dive/pull/1
- https://github.com/frontend-book-study/modern-react-deep-dive/pull/2

## 리액트 애플리케이션 도커라이즈하기

- https://hub.docker.com/r/hoolie1230/next-app

# 회고

## Liked(좋았던 점)

- Github Action과 Docker를 실습해보며 진행해서 텍스트로 읽는것보다 더 이해하기 편했습니다
- 실행해 보면서 이해가 되는 부분이 있었습니다.

## Learned(배웠던 점)

- Dockerfile을 생성해서 도커라이징하면서 단계 별 실행하는 것과 next와 react 배포 차이를 알게 되었습니다.
- Docker의 기본적인 개념과 Dockerfile을 빌드해 이미지를 만드는 과정을 배웠습니다.

## Lacked(아쉬운 점)

- github ci 실습은 모두 진행하지 못했습니다.
- 중요한 내용이 중간에 있어 보였는데 정리하지 못해 아쉽습니다.
- 도커에 대한 개념이 충분치 못한 상태로 실습을 진행해서 모든 실습 과정을 따라가지 못했습니다.

## Longed for(개선점)

- 실습할 기회가 있다면 .. 시간을 넉넉히 해두기?
