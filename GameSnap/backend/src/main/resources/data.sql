-- ENUM 타입으로 컬럼 수정
ALTER TABLE GAME MODIFY COLUMN g_genre ENUM('STRATEGY', 'RPG', 'AOS', 'PUZZLE');

-- 데이터 삽입
insert into GAME(g_genre, g_name) values ('STRATEGY','스타크래프트');
insert into GAME(g_genre, g_name) values ('RPG','로스트아크');
insert into GAME(g_genre, g_name) values ('AOS','리그오브레전드');
insert into GAME(g_genre, g_name) values ('PUZZLE','캔디크러쉬사가');
insert into GAME(g_genre, g_name) values ('PUZZLE','애니팡');