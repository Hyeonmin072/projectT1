package com.gamesnap.backend.dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class LikeStatusResponseDto {
    private boolean isLiked;
    private Integer likes;

    public LikeStatusResponseDto(){

    }
    public LikeStatusResponseDto(boolean isLiked, Integer likes){
        this.isLiked = isLiked;
        this.likes = likes;
    }
}
