package com.gamesnap.backend.controller;

import com.gamesnap.backend.dto.BoardCommentDeleteDto;
import com.gamesnap.backend.dto.BoardCommentResponseDto;
import com.gamesnap.backend.dto.BoardCommentSaveDto;
import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.entity.BoardComment;
import com.gamesnap.backend.repository.BoardCommentRepository;
import com.gamesnap.backend.repository.BoardRepository;
import com.gamesnap.backend.service.BoardCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BoardCommentController {

    private final BoardCommentService boardCommentService;

    //게시글의 댓글 조회 API
    @GetMapping("/board/{boardId}/comments")
    public List<BoardCommentResponseDto> getComments(@PathVariable("boardId") Integer boardId) {
        log.info("boardId: {}", boardId);
        return boardCommentService.getComments(boardId);
    }

    //게시글의 댓글 작성 API
    @PostMapping("/board/{boardId}/comments")
    public ResponseEntity<BoardCommentResponseDto> newComments(@PathVariable("boardId") Integer boardId, @RequestBody BoardCommentSaveDto boardCommentSaveDto) {
        log.info("boardId: {}", boardId);
        return boardCommentService.createComments(boardId, boardCommentSaveDto.getMemberId(), boardCommentSaveDto.getComment());
    }

    //게시글의 댓글 삭제 API
    @PostMapping("/board/{boardId}/comments/delete")
    public ResponseEntity<String> deleteComments(@PathVariable("boardId") Integer boardId, @RequestBody BoardCommentDeleteDto boardCommentDeleteDto) {
        log.info("boardId: {}", boardId);
        return boardCommentService.deleteComments(boardId, boardCommentDeleteDto.getCommentId());
    }
}
