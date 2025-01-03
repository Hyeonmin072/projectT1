package com.gamesnap.backend.dto;

import com.gamesnap.backend.entity.Member;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
public class BoardResponseDto {

    private Integer id;

    private String title;

    private LocalDate createDate;

    private String memberName;

    private Integer view;

    private Integer like;

    @QueryProjection
    public BoardResponseDto(Integer id, String title, LocalDate createDate, String memberName, Integer view, Integer like) {
        this.id = id;
        this.title = title;
        this.createDate = createDate;
        this.memberName = memberName;
        this.view = view;
        this.like = like;
    }
}
