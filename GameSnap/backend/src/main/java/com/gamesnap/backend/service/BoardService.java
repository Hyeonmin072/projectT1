package com.gamesnap.backend.service;

import com.gamesnap.backend.dto.BoardDetailDto;
import com.gamesnap.backend.dto.BoardResponseDto;
import com.gamesnap.backend.dto.BoardSaveDto;
import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.repository.BoardRepository;
import com.gamesnap.backend.repository.GameRepository;
import com.gamesnap.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.time.LocalDate;
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
                    findBoard.getMember().getName(),
                    findBoard.getView(),
                    findBoard.getLike(),
                    findBoard.getGame().getName(),
                    findBoard.getComments());
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
}
