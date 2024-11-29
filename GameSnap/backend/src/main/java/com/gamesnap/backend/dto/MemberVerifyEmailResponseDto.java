package com.gamesnap.backend.dto;

import lombok.Data;

@Data
public class MemberVerifyEmailResponseDto {
    private boolean verified;
    private String message ;
}
