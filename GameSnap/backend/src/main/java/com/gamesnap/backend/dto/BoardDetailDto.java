package com.gamesnap.backend.dto;

import com.gamesnap.backend.entity.BoardComment;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class BoardDetailDto {

    private Integer id;

    private String title;

    private String content;

    private LocalDate createDate;

    private Integer memberId;

    private String memberName;

    private Integer view;

    private Integer like;

    private String gameName;

    public BoardDetailDto(Integer id, String title, String content, LocalDate createDate, Integer memberId, String memberName, Integer view, Integer like, String gameName) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createDate = createDate;
        this.memberId = memberId;
        this.memberName = memberName;
        this.view = view;
        this.like = like;
        this.gameName = gameName;
    }
}
