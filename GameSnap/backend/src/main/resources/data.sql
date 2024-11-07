-- ENUM 타입으로 컬럼 수정
ALTER TABLE GAME MODIFY COLUMN g_genre ENUM('STRATEGY', 'RPG', 'AOS', 'PUZZLE');

-- 데이터 삽입(실행마다 중복 방지)

INSERT INTO GAME (g_genre, g_name)
VALUES ('STRATEGY', '스타크래프트')
    ON DUPLICATE KEY UPDATE g_name = g_name;

INSERT INTO GAME (g_genre, g_name)
VALUES ('RPG', '로스트아크')
    ON DUPLICATE KEY UPDATE g_name = g_name;

INSERT INTO GAME (g_genre, g_name)
VALUES ('AOS', '리그오브레전드')
    ON DUPLICATE KEY UPDATE g_name = g_name;

INSERT INTO GAME (g_genre, g_name)
VALUES ('PUZZLE', '캔디크러쉬사가')
    ON DUPLICATE KEY UPDATE g_name = g_name;

INSERT INTO GAME (g_genre, g_name)
VALUES ('PUZZLE', '애니팡')
    ON DUPLICATE KEY UPDATE g_name = g_name;
