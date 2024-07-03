---
title: '1장 리액트 개발을 위해 꼭 알아야 할 자바스크립트'
created: 2024-07-03
updated: 2024-07-03
tags:
  - 'Frontend'
  - 'Study'
  - 'Book'
---


1. 

---

2. 

---

3. 

---
4. 

---
5. 

---
6. tsconfig.json를 다음과 같이 작성했을 때, null 및 undefined 타입과 관련해 발생할 수 있는 이슈를 작성하고, 어떤 방법으로 해결할 수 있을지 설명해주세요.
```json
{
  "compilerOptions": {
    "target": "es2016",                                  
    "module": "commonjs",                                

    "outDir": "./dist",                                   

    "esModuleInterop": true,                             
    "forceConsistentCasingInFileNames": true,            

    "strict": true,                                      
    "strictNullChecks": true,                         
    "skipLibCheck": true                                 
  }
}
```
**answer** <br>명시적으로 타입에 null이나 undefined를 지정해주지 않았을 경우 null이나 undefined가 될 수 있는 경우에 에러가 발생합니다.
이를 해결하기 위해 `타입가드`를 사용하거나 !(Non-null assertion operator)를 사용하여 해결할 수 있습니다.

---
7.

---
8.
---




