package com.gamesnap.backend;

import com.gamesnap.backend.entity.*;
import com.gamesnap.backend.repository.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private VideoCommentRepository videoCommentRepository;
    @Autowired
    private MemberGameRepository memberGameRepository;
    @Autowired
    private VideoRepository videoRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private BoardRepository boardRepository;

    @BeforeEach
    @Transactional
    public void initData() {


        if (memberRepository.count()==0) { //유저 초기 데이터 추가, 반복 실행 문제 X
            memberRepository.save(new Member("test@test.com", "test123", "테스트용계정", "01012345678"));
            memberRepository.save(new Member("test1@test.com", "test123", "테스트용계정1", "01012345678"));
            memberRepository.save(new Member("test2@test.com", "test123", "테스트용계정2", "01012345678"));
        }
        if (gameRepository.count() == 0) { //게임 초기 데이터 추가, 반복 실행 문제 X
            gameRepository.save(new Game(Genre.NO, "자유게시판"));
            gameRepository.save(new Game(Genre.STRATEGY, "스타크래프트"));
            gameRepository.save(new Game(Genre.RPG, "로스트아크"));
            gameRepository.save(new Game(Genre.AOS, "리그 오브 레전드"));
            gameRepository.save(new Game(Genre.PUZZLE, "캔디크러쉬사가"));
            gameRepository.save(new Game(Genre.PUZZLE, "애니팡"));
        }
        if (boardRepository.count() == 0) { //게시글 초기 데이터 추가, 반복 실행 문제 X
            Game findGame = null;
            Member findMember = null;
            Optional<Game> findGameResult = gameRepository.findByName("스타크래프트");
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
        if(videoRepository.count() == 0){
            Member member = null;
            Game game = null;
            Optional<Member> findMember = memberRepository.findById(1);
            Optional<Game> findGame = gameRepository.findById(3);
            if(findMember.isPresent()){
                member = findMember.get();
            }
            if(findGame.isPresent()){
                game = findGame.get();
            }

            videoRepository.save(new Video(
                    "테스트영상1","테스트영상설명","testurl",52,100,LocalDateTime.now(),member,game)
            );

        }
        if(memberGameRepository.count()==0){
            Optional<Member> findmember1 = memberRepository.findById(1);
            Member member1 = findmember1.get();
            Optional<Game> findgame1 = gameRepository.findById(3);
            Game game1 = findgame1.get();
            Optional<Game> findgame2 = gameRepository.findById(4);
            Game game2 = findgame2.get();
            memberGameRepository.save(new MemberGame(member1,game1));
            memberGameRepository.save(new MemberGame(member1,game2));
        }
        if(videoCommentRepository.count() == 0 ){
            Optional<Video> findVideo1 = videoRepository.findById(1);
            Video video1 = findVideo1.get();
            Optional<Member> findMember1 = memberRepository.findById(1);
            Member member1 = findMember1.get();
            Optional<Member> findMember2 = memberRepository.findById(2);
            Member member2 = findMember1.get();
            videoCommentRepository.save(new VideoComment("테스트댓글입니다",video1,member1));
            videoCommentRepository.save(new VideoComment("테스트댓글입니다2",video1,member2));
        }
    }

    @Test
    public void test() {
        Assertions.assertThat(gameRepository.findAll()).hasSizeGreaterThan(0); //게임 데이터가 제대로 들어갔는지 그냥 확인
    }
}
