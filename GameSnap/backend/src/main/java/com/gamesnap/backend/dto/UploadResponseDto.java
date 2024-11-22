package com.gamesnap.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Data
public class UploadResponseDto {
    private Integer id;
    private String title;
    private String desc;
    private String streamUrl;
    private LocalDateTime createDate;
    private String memberName;

    public UploadResponseDto(Integer id, String title, String desc, String streamUrl, String memberName) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.streamUrl = streamUrl;
        this.createDate = LocalDateTime.now();
        this.memberName = memberName;

    }
}
