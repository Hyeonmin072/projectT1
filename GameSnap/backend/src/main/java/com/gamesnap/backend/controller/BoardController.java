package com.gamesnap.backend.controller;

import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.service.BoardService;
import jakarta.persistence.Id;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BoardController {
    private final BoardService boardService;

    @GetMapping("/board/{gameId}")
    public List<Board> getBoards(@RequestHeader Map<String, String> headers, @PathVariable("gameId") Integer gameId) {
        log.info("요청 헤더 ={}", headers);
        List<Board> result = boardService.findBoards(gameId);
        log.info("모든 게임 = {}",result.toString());
        return result;
    }

}
