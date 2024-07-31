---
title: 5주차: 7장.2 비동기 호출 ~ 8장.1 JSX에서 TSX로 (218~267)
created: 2024-07-31
updated: 2024-07-31
tags:
- '우아한타입스크립with리액트'
---

## 7.2 API 상태 관리하기

#### Q1. 비동기 AP를 호출하기 위해서는 API의 성공, 실패에 따른 상태 관리가 되어야 하므로 상태 관리 라이브러리의 액션이나 훅과 같이 재정의 된 형태를 사용해야 합니다. 상태 관리 라이브러리로는 Redux, mobX 등이 있습니다. 이와 같은 상태 관리 라이브러리가 아닌 react-query, useSwr과 같은 훅을 사용해 호출할 때의 이점을 설명하세요.


#### A1. Redux나 mobX와 같은 상태 변경 라이브러리는 비동기 처리 함수를 호출하기 위해 액션이 추가될 때마다 관련된 스토어나 상태가 계속 늘어납니다. 이로 인해 전역 상태 관리자가 모든 비동기 상태에 접근하고 변경할 수 있다는 것인데요. 쓸데 없는 비동기 통신이 발생하거나 의도치 않은 상태 변경이 발생할 수도 있습니다. 
react-query나 useSWR 같은 훅을 사용한 방법은 훨씬 간단합니다. cache를 사용해 비동기 함수를 호출하며 의도치 않은 상태 변경을 방지하는데 도움이 됩니다.

#### Q2. 다음 JobList 컴포넌트를 최신 상태로 유지하기 위해 폴링(Polling)을 적용하려 합니다. 폴링 방식을 사용하기 위해 추가해야 할 코드를 작성해주세요. 단, useFetchJobList()는 react-query 훅이며, 클라이언트가 서버에 요청을 보내는 간격은 15초입니다.

```tsx
interface Job {
  id: number;
  name: string;
}

const JobList = () => {
  const {
     refetch, data, isLoading, isError
  } = useFetchJobList();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading jobs</div>;

  return (
    <>
      {data.map((job: Job) => (
        <div key={job.id}>{job.name}</div>
      ))}
    </>
  )
}
```

#### A2. 
```tsx
interface Job {
  id: number;
  name: string;
}

const JobList = () => {
  const {
     refetch, data, isLoading, isError
  } = useFetchJobList();

  // 15초마다 폴링 실행 
  useEffect(() => {
    const interval = setInterval(refetch, 15000);
    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading jobs</div>;

  return (
    <>
      {data.map((job: Job) => (
        <div key={job.id}>{job.name}</div>
      ))}
    </>
  )
}
```

## 7.3 API 에러 핸들링(1)

#### Q


#### A

## 7.3 API 에러 핸들링(2)

#### Q


#### A


## 7.4 API 모킹 (1)

#### Q


#### A

## 7.4 API 모킹 (2)

#### Q


#### A


## 8.1 리액트 컴포넌트의 타입 (1)

#### Q


#### A

## 8.1 리액트 컴포넌트의 타입 (2)

#### Q


#### A
