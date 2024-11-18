package com.gamesnap.backend.service;

import com.gamesnap.backend.dto.*;
import com.gamesnap.backend.entity.*;
import com.gamesnap.backend.repository.BoardLikeRepository;
import com.gamesnap.backend.repository.BoardRepository;
import com.gamesnap.backend.repository.GameRepository;
import com.gamesnap.backend.repository.MemberRepository;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.gamesnap.backend.entity.QBoard.*;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BoardService {
    private final BoardRepository boardRepository;
    private final GameRepository gameRepository;
    private final MemberRepository memberRepository;
    private final BoardLikeRepository boardLikeRepository;
    private final JPAQueryFactory queryFactory;

    public Page<BoardResponseDto> findBoards(Integer gameId, int currentPage, int sizePerPage) {
        Optional<Game> findResult = gameRepository.findById(gameId); // 아이디로 게임 조회
        if (findResult.isPresent()) { // 해당 게임이 존재하면
            Game findGame = findResult.get(); // 조회 결과에서 찾은 게임을 꺼냄
            PageRequest pageRequest = PageRequest.of(currentPage, sizePerPage); // 페이징 사용
            Page<Board> findBoards = boardRepository.findByGameOrderByCreateDateDesc(findGame, pageRequest); // 찾은 게임을 컬럼으로 가지는 게시글들을 조회
            log.info("result = {}", findBoards);
            Page<BoardResponseDto> boardResponseDtos = findBoards.map(findBoard ->  new BoardResponseDto( // 찾은 게시글들을 dto로 맵핑
                        findBoard.getId(),
                        findBoard.getTitle(),
                        findBoard.getCreateDate(),
                        findBoard.getMember().getName(),
                        findBoard.getView(),
                        findBoard.getLike()
            ));
            return boardResponseDtos; // 맵핑한 dto를 반환
        }
        return Page.empty(); // 존재하지 않으면 빈 페이지 반환
    }

    public BoardDetailDto boardDetail(Integer boardId) {
        Optional<Board> findResult = boardRepository.findById(boardId);
        if (findResult.isPresent()) {
            Board findBoard = findResult.get();
            BoardDetailDto boardDetailDto = new BoardDetailDto(
                    findBoard.getId(),
                    findBoard.getTitle(),
                    findBoard.getContent(),
                    findBoard.getCreateDate(),
                    findBoard.getMember().getId(),
                    findBoard.getMember().getName(),
                    findBoard.getView(),
                    findBoard.getLike(),
                    findBoard.getGame().getName());
            return boardDetailDto;
        }
        return null;
    }

    public ResponseEntity<Board> createBoard(@ModelAttribute BoardSaveDto boardSaveDto) {
        Optional<Game> findGame = gameRepository.findById(boardSaveDto.getGameId());
        Optional<Member> findMember = memberRepository.findById(boardSaveDto.getUserId());

        if (findGame.isPresent() && findMember.isPresent()) {
            Board newBoard = new Board(findGame.get(), findMember.get(), boardSaveDto.getContent(), boardSaveDto.getTitle());
            boardRepository.save(newBoard);
            return ResponseEntity.ok(newBoard);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }


    public ResponseEntity<String> increaseView(Integer boardId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        if (optionalBoard.isPresent()) {
            Board board = optionalBoard.get();
            board.increaseView();
            return ResponseEntity.ok("게시글 아이디가 " + boardId + "인 게시글의 조회수가 증가했어요!!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public ResponseEntity<String> deleteBoard(Integer boardId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        if (optionalBoard.isPresent()) {
            Board board = optionalBoard.get();
            boardLikeRepository.deleteByBoard(board);
            boardRepository.delete(board);
            return ResponseEntity.ok("게시글이 삭제되었어요");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public BoardDetailDto toggleLike(Integer boardId, String memberName) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId); //게시판 아이디로 게시판 조회
        Optional<Member> optionalMember = memberRepository.findByName(memberName); // 멤버 이름으로 멤버 조회

        if (optionalBoard.isPresent() && optionalMember.isPresent()) { // 게시판,멤버 둘 다 존재하면 꺼냄
            Member findMember = optionalMember.get();
            Board findBoard = optionalBoard.get();

            Optional<BoardLike> findResult = boardLikeRepository.findBoardLikeByMemberAndBoard(findMember, findBoard); //매핑 테이블 조회

            if(findResult.isEmpty()) { // 조회가 안되면, 해당 게시물에 해당 유저가 좋아요를 아직 하지 않은 것 -> 좋아요 수 증가하고, 추후 확인 위해 매핑 테이블 생성
                findBoard.increaseLike();
                BoardLike boardLike = new BoardLike(findMember, findBoard);
                boardLikeRepository.save(boardLike);
            } else { // 조회가 되면, 해당 게시물에 해당 유저가 이미 좋아요를 한 것이므로 -> 좋아요 수 감소하고, 매핑 테이블을 삭제
                findBoard.decreaseLike();
                boardLikeRepository.delete(findResult.get());
            }

            BoardDetailDto boardDetailDto = new BoardDetailDto(
                    findBoard.getId(),
                    findBoard.getTitle(),
                    findBoard.getContent(),
                    findBoard.getCreateDate(),
                    findBoard.getMember().getId(),
                    findBoard.getMember().getName(),
                    findBoard.getView(),
                    findBoard.getLike(),
                    findBoard.getGame().getName());
            return boardDetailDto;
        } else { // 게시물, 멤버 둘 중 하나가 없으면 에러
            throw new RuntimeException("게시글이나 회원을 찾을 수 없습니다.");
        }
    }

    public ResponseEntity<String> updateBoard(Integer boardId, BoardUpdateDto boardUpdateDto) {
        Optional<Board> optionBoard = boardRepository.findById(boardId);
        if (optionBoard.isPresent()) {
            Board board = optionBoard.get();
            board.update(boardUpdateDto.getTitle(), boardUpdateDto.getContent());
            return ResponseEntity.ok("게시글이 수정되었어요");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public Page<BoardResponseDto> searchBoard(Integer gameId, int page, int pageSize, String boardNameCond) {
        Pageable pageable = PageRequest.of(page, pageSize);

        log.info("검색 요청: gameId = {}, page = {}, pageSize = {}, boardNameCond = '{}'", gameId, page, pageSize, boardNameCond);

        List<BoardResponseDto> findResult = queryFactory
                .select(new QBoardResponseDto(board.id, board.title, board.createDate, board.member.name, board.view, board.like))
                .from(board)
                .where(boardNameLike(boardNameCond), gameIdEq(gameId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        log.info("검색 결과: {}", findResult);

        long total = queryFactory
                .select(board.count())
                .from(board)
                .where(boardNameLike(boardNameCond), gameIdEq(gameId))
                .fetchOne();

        log.info("총 결과 수: {}", total);

        Page<BoardResponseDto> findBoards = new PageImpl<>(findResult, pageable, total);
        return findBoards;
    }


    private BooleanExpression boardNameLike(String boardNameCond) {
        return boardNameCond != null ? board.title.like("%" + boardNameCond + "%") : null;
    }

    private BooleanExpression gameIdEq(Integer gameId) {
        return gameId != null ? board.game.id.eq(gameId) : null;
    }
}
