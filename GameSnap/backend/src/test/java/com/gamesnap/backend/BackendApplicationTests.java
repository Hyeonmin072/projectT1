package com.gamesnap.backend;

import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.entity.Genre;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.repository.BoardRepository;
import com.gamesnap.backend.repository.GameRepository;
import com.gamesnap.backend.repository.MemberRepository;
import com.gamesnap.backend.service.MemberService;
//import lombok.RequiredArgsConstructor;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private BoardRepository boardRepository;



    @BeforeEach
    @Transactional
    public void initData() {
        Optional<Member> findByEmail = memberRepository.findByEmail("test@test.com");
        if (findByEmail.isEmpty()) { //유저 초기 데이터 추가, 반복 실행 문제 X
            Member testMember = memberRepository.save(new Member("test@test.com", "test123", "테스트용계정", "01012345678"));
        }
        if (gameRepository.count() == 0) { //게임 초기 데이터 추가, 반복 실행 문제 X
            gameRepository.save(new Game(Genre.STRATEGY, "스타크래프트"));
            gameRepository.save(new Game(Genre.RPG, "로스트아크"));
            gameRepository.save(new Game(Genre.AOS, "리그오브레전드"));
            gameRepository.save(new Game(Genre.PUZZLE, "캔디크러쉬사가"));
            gameRepository.save(new Game(Genre.PUZZLE, "애니팡"));
        }

        if (boardRepository.count() == 0) { //게시글 초기 데이터 추가, 반복 실행 문제 X
            Game findGame = null;
            Member findMember = null;
            Optional<Game> findGameResult = gameRepository.findById(1);
            if (findGameResult.isPresent()) {
                findGame = findGameResult.get();
            }
            Optional<Member> findMemberResult = memberRepository.findByEmail("test@test.com");
            if (findMemberResult.isPresent()) {
                findMember = findMemberResult.get();
            }
            boardRepository.save(new Board(findGame, findMember, "스타크래프트 노잼", "스타크래프트 첫번째 게시글"));
            boardRepository.save(new Board(findGame, findMember, "스타크래프트 꿀잼", "스타크래프트 두번째 게시글"));
        }
    }

    @Test
    public void test() {
        Assertions.assertThat(gameRepository.findAll()).hasSizeGreaterThan(0); //게임 데이터가 제대로 들어갔는지 그냥 확인

    }


}
