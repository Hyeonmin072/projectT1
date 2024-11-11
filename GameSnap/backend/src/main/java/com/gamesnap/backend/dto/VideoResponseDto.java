package com.gamesnap.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
public class VideoResponseDto {
    private Integer id;
    private String title;
    private String desc;
    private String streamUrl;
    private Integer like;
    private LocalDateTime createDate;
    private String name;
    private boolean isLiked;
    public VideoResponseDto(Integer id, String title, String desc, String streamUrl, Integer like, LocalDateTime createDate, String name,boolean isLiked) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.streamUrl = streamUrl;
        this.like = like;
        this.createDate = createDate;
        this.name = name;
        this.isLiked = isLiked;
    }
}
