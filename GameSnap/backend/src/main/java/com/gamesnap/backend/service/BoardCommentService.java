package com.gamesnap.backend.service;

import com.gamesnap.backend.dto.BoardCommentResponseDto;
import com.gamesnap.backend.dto.BoardResponseDto;
import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.entity.BoardComment;
import com.gamesnap.backend.repository.BoardCommentRepository;
import com.gamesnap.backend.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardCommentService {

    private final BoardCommentRepository boardCommentRepository;
    private final BoardRepository boardRepository;

    public List<BoardCommentResponseDto> getComments(Integer boardId) {
        Optional<Board> optionBoard = boardRepository.findById(boardId); // 게시글 아이디로 조회
        if (optionBoard.isPresent()) { // 조회 시, 해당 게시글이 존재하면
            Board board = optionBoard.get(); // 게시글을 꺼내기
            List<BoardComment> comments = board.getComments(); // 게시글의 댓글을 가져오기
            ArrayList<BoardCommentResponseDto> boardCommentResponseDtos = new ArrayList<>(); // dto를 담을 리스트를 생성
            for (BoardComment comment : comments) { //for문을 돌리며 dto에 하나씩 추가
                BoardCommentResponseDto boardCommentResponseDto = new BoardCommentResponseDto(
                        comment.getId(),
                        comment.getComment(),
                        comment.getCreateDate(),
                        comment.getMember().getName(),
                        comment.getMember().getId());
                boardCommentResponseDtos.add(boardCommentResponseDto);
            }
            return boardCommentResponseDtos; //dto 리스트를 반환
        }
        return new ArrayList<>(); // 조회 시, 해당 게시글이 없으면 빈 리스트 반환
    }
}
