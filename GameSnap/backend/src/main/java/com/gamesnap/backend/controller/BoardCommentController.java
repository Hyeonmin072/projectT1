package com.gamesnap.backend.controller;

import com.gamesnap.backend.dto.BoardCommentResponseDto;
import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.repository.BoardCommentRepository;
import com.gamesnap.backend.repository.BoardRepository;
import com.gamesnap.backend.service.BoardCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BoardCommentController {

    private final BoardCommentService boardCommentService;

    //게시글의 댓글 조회 API
    @GetMapping("/board/{boardId}/comments")
    public List<BoardCommentResponseDto> comments(@PathVariable("boardId") Integer boardId) {
        log.info("boardId: {}", boardId);
        return boardCommentService.getComments(boardId);
    }
}
