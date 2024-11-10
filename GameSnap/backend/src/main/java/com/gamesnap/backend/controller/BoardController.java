package com.gamesnap.backend.controller;

import com.gamesnap.backend.dto.BoardDetailDto;
import com.gamesnap.backend.dto.BoardResponseDto;
import com.gamesnap.backend.dto.BoardSaveDto;
import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.service.BoardService;
import jakarta.persistence.Id;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BoardController {
    private final BoardService boardService;

    @GetMapping("/boardList/{gameId}")
    public List<BoardResponseDto> getBoards(@PathVariable("gameId") Integer gameId) {
        List<BoardResponseDto> result = boardService.findBoards(gameId);
        return result;
    }

    @GetMapping("/board/{boardId}")
    public BoardDetailDto boardDetail(@PathVariable("boardId") Integer boardId) {
        BoardDetailDto result = boardService.boardDetail(boardId);
        return result;
    }

    @PostMapping("/board/write")
    public ResponseEntity<Board> writeBoard(@ModelAttribute BoardSaveDto boardSaveDto) {
        return boardService.saveBoard(boardSaveDto);
    }

    @PatchMapping("/board/{boardId}/view")
    public ResponseEntity<String> viewBoard(@PathVariable("boardId") Integer boardId) {
        return boardService.increaseView(boardId);
    }

}
