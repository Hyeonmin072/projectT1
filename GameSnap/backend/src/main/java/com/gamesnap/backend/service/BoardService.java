package com.gamesnap.backend.service;

import com.gamesnap.backend.dto.BoardDetailDto;
import com.gamesnap.backend.dto.BoardResponseDto;
import com.gamesnap.backend.dto.BoardSaveDto;
import com.gamesnap.backend.dto.BoardUpdateDto;
import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.entity.BoardLike;
import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.repository.BoardLikeRepository;
import com.gamesnap.backend.repository.BoardRepository;
import com.gamesnap.backend.repository.GameRepository;
import com.gamesnap.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BoardService {
    private final BoardRepository boardRepository;
    private final GameRepository gameRepository;
    private final MemberRepository memberRepository;
    private final BoardLikeRepository boardLikeRepository;

    public List<BoardResponseDto> findBoards(Integer gameId) {
        Optional<Game> findResult = gameRepository.findById(gameId); // 아이디로 게임 조회
        if (findResult.isPresent()) { // 해당 게임이 존재하면
            Game findGame = findResult.get(); // 조회 결과에서 찾은 게임을 꺼냄
            List<Board> findBoards = boardRepository.findByGame(findGame); // 찾은 게임을 컬럼으로 가지는 게시글들을 조회
            log.info("result = {}", findBoards);
            List<BoardResponseDto> boardResponseDtos = new ArrayList<>(); //Dto 객체 리스트 생성
            for (Board findBoard : findBoards) { //Dto에 값 주입
                BoardResponseDto boardResponseDto = new BoardResponseDto(
                        findBoard.getId(),
                        findBoard.getTitle(),
                        findBoard.getCreateDate(),
                        findBoard.getMember().getName(),
                        findBoard.getView(),
                        findBoard.getLike());
                
                boardResponseDtos.add(boardResponseDto); //리스트에 추가
            }
            return boardResponseDtos;
        }
        return List.of();
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

    public ResponseEntity<Board> saveBoard(@ModelAttribute BoardSaveDto boardSaveDto) {
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
}
