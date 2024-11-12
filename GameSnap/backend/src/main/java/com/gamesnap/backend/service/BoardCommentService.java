package com.gamesnap.backend.service;

import com.gamesnap.backend.dto.BoardCommentResponseDto;
import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.entity.BoardComment;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.repository.BoardCommentRepository;
import com.gamesnap.backend.repository.BoardRepository;
import com.gamesnap.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class BoardCommentService {

    private final BoardCommentRepository boardCommentRepository;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

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

    public ResponseEntity<BoardCommentResponseDto> createComments(Integer boardId, Integer memberId, String comment) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId); // 아이디로 게시글 조회
        Optional<Member> optionalMember = memberRepository.findById(memberId); // 아이디로 멤버 조회
        if (optionalBoard.isPresent() && optionalMember.isPresent()) { // 둘다 존재하면
            Board board = optionalBoard.get(); // 게시글 꺼내기
            Member member = optionalMember.get(); // 멤버 꺼내기
            BoardComment boardComment = new BoardComment(comment, board, member); // 새로운 댓글 생성
            boardCommentRepository.save(boardComment); // 생성한 것을 저장
            return ResponseEntity.ok(new BoardCommentResponseDto(
                    boardComment.getId(),
                    boardComment.getComment(),
                    boardComment.getCreateDate(),
                    boardComment.getMember().getName(),
                    boardComment.getMember().getId())); // 성공 결과 반환
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 조회 시 존재하지 않은게 있다면 실패 결과 반환
    }

    public ResponseEntity<String> deleteComments(Integer boardId, Integer commentId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId); //게시글 조회
        Optional<BoardComment> optionalBoardComment = boardCommentRepository.findById(commentId); // 게시글 댓글 조회
        if (optionalBoard.isPresent() && optionalBoardComment.isPresent()) { // 둘다 존재하면
            Board board = optionalBoard.get(); // 게시글 꺼내기
            BoardComment boardComment = optionalBoardComment.get(); // 댓글 꺼내기
            boardCommentRepository.delete(boardComment); // 댓글 삭제(oneToMany인 Board 쪽에 orphanRemoval을 설정해주었음으로 보드쪽에서 수동 삭제 필요 X)
            return ResponseEntity.ok("댓글이 정상적으로 삭제되었어요"); // 성공 결과 반환
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 조회 시 존재하지 않은게 있다면 실패 결과 반환
    }
}
