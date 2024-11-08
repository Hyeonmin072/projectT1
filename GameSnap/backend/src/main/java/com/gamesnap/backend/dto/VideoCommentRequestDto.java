package com.gamesnap.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class VideoCommentRequestDto {
    private String content;
    private Integer videoId;
    private Integer memberId;

    public VideoCommentRequestDto(String content, Integer videoId, Integer memberId){
        this.content = content;
        this.videoId = videoId;
        this.memberId = memberId;
    }
}
