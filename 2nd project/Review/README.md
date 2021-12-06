
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

2-1. logreg와 테이블 통합 . 
테스트를 위해 password를 NULL로 둠. logreg에선 NOT NULL로 해야 함. 
그리고 name과 email은 회원가입할때 입력한 것을 가져와야 함.

CREATE TABLE testmerge (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  email varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  password varchar(255) COLLATE utf8mb4_unicode_ci NULL,
  title varchar(1024) NOT NULL,
  message varchar(2048) NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
 ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


3. 루트 디렉토리에서 node app.js

