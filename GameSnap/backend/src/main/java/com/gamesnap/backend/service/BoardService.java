package com.gamesnap.backend.service;

import com.gamesnap.backend.dto.BoardResponseDto;
import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.repository.BoardRepository;
import com.gamesnap.backend.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
