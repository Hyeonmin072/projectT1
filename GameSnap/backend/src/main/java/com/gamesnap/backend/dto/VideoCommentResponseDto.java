package com.gamesnap.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
@Setter
@Data
public class VideoCommentResponseDto {
    private Integer id;
    private String content;
    private LocalDateTime createDate;
    private String name;

    public VideoCommentResponseDto(Integer id, String content, LocalDateTime createDate, String name){
        this.id=id;
        this.content=content;
        this.createDate=createDate;
        this.name=name;
    }

}
