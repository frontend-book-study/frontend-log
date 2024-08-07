---
title: '5주차: 7장.2 비동기 호출 ~ 8장.1 JSX에서 TSX로 (218~267)'
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
Q. API 호출할 때 단순한 서버 에러 외에도 인증 정보 에러, 네트워크 에러, 타임아웃 에러 같은 다양한 에러가 발생하는데요. 이를 '서브 클래싱'을 활용하여 'NetworkError'라는 이름의 커스텀 에러 클래스를 정의해주세요.

#### A
```ts
class NetworkError extends Error {
    constructor(message: string, response?: AxiosResponse<ErrorResponse>) {
        super(message, response);
        this.name = "UnauthorizedError";
    }
}
```

#### Q 
Q. 이처럼 Custom Error 클래스를 서브클래싱하여 정의하는 이유는 무엇인가요?

#### A
에러를 서브클래싱해서 표현하면 명시적으로 에러 처리를 할 수 있습니다. 아래와 같이 작성된 타입 가드문을 통해 코드상에서 에러 핸들링에 대한 부분을 한눈에 볼 수 있습니다.

```ts
try {
    // ...
} catch (error) {
    if (error instanceof NetworkError) {
        alert("네트워크 연결이 원할하지 않습니다. 잠시 후 다시 시도해주세요.");
    }
}

```

## 7.3 API 에러 핸들링(2)

#### Q API 요청 중 401 에러가 발생했을 때 로그인 페이지('/login')로 리다이랙트 시키려면 어떤 처리를 할 수 있을까요? 현재 아래처럼 호출하고 있다고 할 때 처리 예시를 작성해 주세요.

```ts
const fetchExample = async () => {
  const data = await api.fetchEample();
  return data
}
```

#### A
axios 인스턴스의 인터셉터를 사용해 에러를 처리할 수 있지만 try-catch 내에서 에러 처리를 통해서도 가능하다

```ts
const onActionError = (error: Error) => {
  if(error.resonse && error.response.status === 401) {
    window.location.href = "${url}/login";
  }
  return Promise.reject(error);
}

const fetchExample = async () => {
  try {
    const data = await api.fetchEample();
    return data
  } catch(error) {
    onActionError(error)
  }
}
```

## 7.4 API 모킹 (1)

#### Q1. API 모킹을 왜 사용하나요?

#### A1. 프론트엔드 개발이 서버 개발보다 먼저 이루어지거나 서버와 프론트엔드 개발이 동시에 이루어지는 경우가 많습니다.

API 모킹을 사용하면 서버 개발이 완료되지 않거나 서버가 불안정한 상태에서도 프론트엔드 개발을 진행할 수 있습니다. 또한 charles 등의 도구를 활용하면 응답 값을 그대로 복사하여 이슈 발생 상황을 재현하는 데 도움이 됩니다.

#### Q2. 간단한 조회만 필요할 경우에는 어떤 방식이 좋을까요?

#### A2. 간단한 조회만 필요할 경우에는 `.json` 파일을 만들거나 자바스크립트 파일 안에 JSON 형식을 저장하고 export하여 사용할 수 있습니다.

이 방법은 별도 환경 설정이 필요하지 않아 쉽게 구현이 가능합니다. 그러나 실제 API URL로 요청하는 것이 아니기 때문에 모킹을 자주 해야 한다면 요청 경로를 자주 바꾸게 될 수 있습니다.

#### Q3. NextApiHandler와 axios-mock-adapter를사용하면 각각 어떤 장점이 있을까요?

#### A3. NextApiHandler는 모킹 API 경로를 실제 API 경로와 일치시켜 요청 경로를 변경하지 않고 개발할 수 있고, axios-mock-adapter는 목업 사용 여부까지 제어할 수 있어 지속 사용이 가능합니다.

NextApiHandler의 경우는 Next를 사용하면서 개발 시에만 임시로 사용할 때 유용하며, axios-mock-adapter는 에러 케이스 별로 테스트해야 하며 지속적으로 사용할 때 유용합니다.

## 7.4 API 모킹 (2)

#### Q 어떤 상황에 API 모킹을 사용할 수 있고, 어떤 방법들이 있을까요?


#### A.
API 모킹은 1) 프론트 개발시 API가 준비되지 않은 경우, 2) 제한된 환경에서 테스트하기 위한 경우 3) 네트워크 이슈나 API호출 이슈를 재현하고싶을때 사용할 수 있습니다. 

API 모킹은 Charles와 같은 도구를 활용하거나 axios-mock-adapter와 같은 라이브러리를 사용해 API요청을 가로채고, 미리 정의된 응답을 반환하여 테스트를 진행할 수 있습니다.

## 8.1 리액트 컴포넌트의 타입 (1)

#### Q


#### A

## 8.1 리액트 컴포넌트의 타입 (2)

#### Q
리액트의 함수형 컴포넌트에서 DetailedHTMLProps를 사용할 때, ref를 props로 받을 경우 고려해야 할 사항이 존재합니다. <br>

Q1. 무엇을 고려해야 하는지 알려주세요 <br>
Q2. ComponentPropsWithoutRef 타입에 대해서 간략히 설명해주세요.

#### A
A1. <br>
- `DetailedHTMLProps`를 사용해 함수형 컴포넌트의 props로 ref를 받으면, 실제로는 동작하지 않는 ref를 받도록 타입 지정되어 예기치 않은 에러가 발생할 수 있습니다. 클래스 컴포넌트의 경우 ref 객체는 마운트된 컴포넌트의 인스턴스를 current 속성값으로 가지기 때문에 ref가 정상 작동합니다. 하지만 함수형 컴포넌트에서는 생성된 인스턴스가 없기 때문에 ref에 기대한 값이 할당되지 않습니다.
- 함수형 컴포넌트에서 이러한 제약을 극복하기 위해, `React.forwardRef`를 사용하여 ref를 전달 받도록 구현할 수 있습니다.
<br>
A2. <br>

`ComponentPropsWithoutRef<"button">`를 예로 들어 설명하겠습니다. 이 경우, button 태그에 대한 HTML 속성은 모두 포함되지만, ref 속성은 모두 제외됨을 의미합니다. 즉, `ComponentPropsWithoutRef`는 ref 속성을 포함하지 않는 타입입니다.
