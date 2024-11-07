package com.gamesnap.backend.controller;

import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class GameController {

    private final GameService gameService;

    @GetMapping("/game")
    public List<Game> getAllGames(@RequestHeader Map<String, String> headers) {
        log.info("요청 헤더 ={}", headers);
        List<Game> allGames = gameService.findAllGames();
        log.info("모든 게임 = {}",allGames.toString());
        return allGames;
    }
}
