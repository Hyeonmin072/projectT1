package com.gamesnap.backend.controller;

import com.gamesnap.backend.dto.BoardDetailDto;
import com.gamesnap.backend.dto.BoardResponseDto;
import com.gamesnap.backend.dto.BoardSaveDto;
import com.gamesnap.backend.dto.BoardUpdateDto;
import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.service.BoardService;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BoardController {
    private final BoardService boardService;


    //게임 별 게시글 조회 API
    @GetMapping("/boardList/{gameId}")
    public Page<BoardResponseDto> getBoards(@PathVariable("gameId") Integer gameId,
                                            @RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "5") int pageSize) {
        Page<BoardResponseDto> result = boardService.findBoards(gameId, page, pageSize);
        return result;
    }

    //게시글 상세 API
    @GetMapping("/board/{boardId}")
    public BoardDetailDto detailBoard(@PathVariable("boardId") Integer boardId) {
        BoardDetailDto result = boardService.boardDetail(boardId);
        return result;
    }

    //게시글 생성 API
    @PostMapping("/board/write")
    public ResponseEntity<Board> writeBoard(@ModelAttribute BoardSaveDto boardSaveDto) {
        return boardService.createBoard(boardSaveDto);
    }

    //게시글 삭제 API
    @PostMapping("/board/{boardId}/delete")
    public ResponseEntity<String> deleteBoard(@PathVariable("boardId") Integer boardId) {
        return boardService.deleteBoard(boardId);
    }

    //게시글 수정 API
    @PatchMapping("/board/{boardId}")
    public ResponseEntity<String> updateBoard(@PathVariable("boardId") Integer boardId, @RequestBody BoardUpdateDto boardUpdateDto) {
        return boardService.updateBoard(boardId, boardUpdateDto);
    }

    //게시글 검색 API
    @GetMapping("/boardList/{gameId}/search")
    public Page<BoardResponseDto> searchBoard(@PathVariable("gameId") Integer gameId,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "5") int pageSize,
                                              @RequestParam("searchTerm") String searchTerm) {

        log.info("검색 요청 수신: gameId = {}, page = {}, pageSize = {}, searchTerm = '{}'", gameId, page, pageSize, searchTerm);
        return boardService.searchBoard(gameId, page, pageSize, searchTerm);
    }



    //게시글 조회수 증가 API
    @PatchMapping("/board/{boardId}/view")
    public ResponseEntity<String> viewBoard(@PathVariable("boardId") Integer boardId) {
        return boardService.increaseView(boardId);
    }

    //게시글 좋아요 증가 API
    @PatchMapping("/board/{boardId}/like")
    public BoardDetailDto likeBoard(@PathVariable("boardId") Integer boardId, @RequestBody String memberName) {
        return boardService.toggleLike(boardId, memberName);
    }


}
