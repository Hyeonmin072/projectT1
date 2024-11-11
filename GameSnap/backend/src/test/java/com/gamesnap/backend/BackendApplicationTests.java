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
    private VideoLikeRepository videoLikeRepository;

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

    @Autowired
    private BoardCommentRepository boardCommentRepository;

    @BeforeEach
    @Transactional
    public void initData() {


        if (memberRepository.count()==0) { //유저 초기 데이터 추가, 반복 실행 문제 X
            memberRepository.save(new Member("test1@test.com", "test123", "테스트용계정1", "01012345678"));
            memberRepository.save(new Member("test2@test.com", "test123", "테스트용계정2", "01012345678"));
            memberRepository.save(new Member("test3@test.com", "test123", "테스트용계정3", "01012345678"));
        }
        if (gameRepository.count() == 0) { //게임 초기 데이터 추가, 반복 실행 문제 X
            gameRepository.save(new Game(Genre.NO, "자유게시판"));
            gameRepository.save(new Game(Genre.STRATEGY, "스타크래프트"));
            gameRepository.save(new Game(Genre.RPG, "로스트아크"));
            gameRepository.save(new Game(Genre.AOS, "리그오브레전드"));
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
            Optional<Member> findMemberResult = memberRepository.findByEmail("test1@test.com");
            if (findMemberResult.isPresent()) {
                findMember = findMemberResult.get();
            }
            boardRepository.save(new Board(findGame, findMember, "스타크래프트 노잼", "스타크래프트 첫번째 게시글"));
            boardRepository.save(new Board(findGame, findMember, "스타크래프트 꿀잼", "스타크래프트 두번째 게시글"));
        }
        if(videoRepository.count() == 0){
            Member member = null;
            Game game = null;
            Optional<Member> findMember = memberRepository.findByName("테스트용계정1");
            Optional<Game> findGame = gameRepository.findByName("로스트아크");
            if(findMember.isPresent()){
                member = findMember.get();
            }
            if(findGame.isPresent()){
                game = findGame.get();
            }

            videoRepository.save(new Video(
                    "테스트영상1","테스트영상설명","testurl",100,LocalDateTime.now(),member,game)
            );

        }
        if(videoLikeRepository.count()==0){
            Optional<Member> findMember1 = memberRepository.findByName("테스트용계정1");
            Optional<Member> findMember2 = memberRepository.findByName("테스트용계정2");
            Optional<Member> findMember3 = memberRepository.findByName("테스트용계정3");
            Optional<Video> findVideo1 = videoRepository.findByTitle("테스트영상1");
            Member member1 = findMember1.get();
            Member member2 = findMember2.get();
            Member member3 = findMember3.get();
            Video video = findVideo1.get();
            VideoLike videoLike1 = new VideoLike(member1,video);
            VideoLike videoLike2 = new VideoLike(member2,video);
            VideoLike videoLike3 = new VideoLike(member3,video);
            videoLikeRepository.save(videoLike1);
            videoLikeRepository.save(videoLike2);
            videoLikeRepository.save(videoLike3);
        }
        if(memberGameRepository.count()==0){
            Optional<Member> findmember1 = memberRepository.findByName("테스트용계정1");
            Member member1 = findmember1.get();
            Optional<Game> findgame1 = gameRepository.findByName("로스트아크");
            Game game1 = findgame1.get();
            Optional<Game> findgame2 = gameRepository.findByName("리그오브레전드");
            Game game2 = findgame2.get();
            memberGameRepository.save(new MemberGame(member1,game1));
            memberGameRepository.save(new MemberGame(member1,game2));
        }
        if(videoCommentRepository.count() == 0 ){
            Optional<Video> findVideo1 = videoRepository.findByTitle("테스트영상1");
            Video video1 = findVideo1.get();
            Optional<Member> findMember1 = memberRepository.findByName("테스트용계정1");
            Member member1 = findMember1.get();
            Optional<Member> findMember2 = memberRepository.findByName("테스트용계정2");
            Member member2 = findMember2.get();
            videoCommentRepository.save(new VideoComment("테스트댓글입니다",video1,member1));
            videoCommentRepository.save(new VideoComment("테스트댓글입니다2",video1,member2));
        }
        if(boardCommentRepository.count() == 0 ){
            Optional<Board> optionBoard = boardRepository.findByTitle("스타크래프트 첫번째 게시글");
            Optional<Member> optionMember1 = memberRepository.findByName("테스트용계정1");
            Optional<Member> optionMember3 = memberRepository.findByName("테스트용계정3");


            if(optionBoard.isPresent() && optionMember1.isPresent() && optionMember3.isPresent()){
                Board board = optionBoard.get();
                Member member1 = optionMember1.get();
                Member member3 = optionMember3.get();
                boardCommentRepository.save(new BoardComment("김밥 한줄 놔두고 갑니다^^ @)))))))))",board,member1));
                boardCommentRepository.save(new BoardComment("좋아요 누르고 갑니다..^^",board,member3));
            }
        }
    }

    @Test
    public void test() {
        Assertions.assertThat(gameRepository.findAll()).hasSizeGreaterThan(0); //게임 데이터가 제대로 들어갔는지 그냥 확인
    }
}
