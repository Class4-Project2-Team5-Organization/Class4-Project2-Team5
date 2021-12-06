
게시판 앱을 구동하는 과정

0. app.js에서 본인의 mysql 접근정보 수정.
    host: //본인 root계정 비밀번호작성
    user: //본인 root계정 비밀번호작성
    password: //본인 root계정 비밀번호작성
    database: 'orthodox_review'

1. 데이터베이스 생성

데이터베이스 명 : orthodox_review


2. 테이블 생성

create table users(
    id int(100) NOT NULL AUTO_INCREMENT, 
    name varchar(100), email varchar(100), 
    phone_no varchar(1024), PRIMARY KEY(id)
);

3. 루트 디렉토리에서 node app.js

