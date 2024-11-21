package com.gamesnap.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

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
