package com.gamesnap.backend.dto;

import lombok.Data;

@Data
public class ProfileUpdateContentRequestDto {
    private String content;
    private Integer userId;
}
