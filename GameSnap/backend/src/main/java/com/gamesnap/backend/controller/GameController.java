package com.gamesnap.backend.controller;

import com.gamesnap.backend.dto.GameListDto;
import com.gamesnap.backend.entity.Game;
import com.gamesnap.backend.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
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
    public List<GameListDto> getAllGames() {
        List<GameListDto> allGames = gameService.findAllGames();
        return allGames;
    }
}
