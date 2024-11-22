package com.gamesnap.backend.dto;

import lombok.Data;

@Data
public class ProfileUpdateNameRequestDto {
    private String userName;
    private Integer userId;
}
