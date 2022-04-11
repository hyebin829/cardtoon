# cardtoon


카드뉴스처럼 넘기는 형식의 웹툰을 등록하거나 볼 수 있는 서비스입니다.

 

 ## 사용 기술

 

- Web : babel, webpack 

- Frontend : javascript , react, redux , styled-components, mui

- Backend : express, sequelize, MySQL

- Production : docker , NginX

 
 ***
 
 
 ## 구현 기능및 내용
 
 사진 용량 문제로 블로그 게시글에 작성했습니다.
 https://hb829.tistory.com/3
 




***
## 실행 방법 

### 환경변수 설정
- root 폴더에 .env 생성 (docker-compose.yml 파일과 같은 경로)

```jsx
DB_PASSWORD=[데이터베이스 비밀번호]
```

- server 폴더에 .env 생성

```jsx
DB_PASSWORD=[데이터베이스 비밀번호]
COOKIE_SECRET=[cookie secret key]
```

### 프론트 빌드

```jsx
cd client 
npm install
npm run build
```

### 실행
```jsx
root 경로에서
docker-compose up
```
