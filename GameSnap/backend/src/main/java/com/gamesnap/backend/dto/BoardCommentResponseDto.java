package com.gamesnap.backend.dto;

import com.gamesnap.backend.entity.Board;
import com.gamesnap.backend.entity.BoardComment;
import com.gamesnap.backend.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class BoardCommentResponseDto {
    private Integer id;

    private String comment;

    private LocalDate createDate;

    private String memberName;

    private Integer memberId;

    public BoardCommentResponseDto(Integer id, String comment, LocalDate createDate, String memberName, Integer memberId) {
        this.id = id;
        this.comment = comment;
        this.createDate = createDate;
        this.memberName = memberName;
        this.memberId = memberId;
    }
}
