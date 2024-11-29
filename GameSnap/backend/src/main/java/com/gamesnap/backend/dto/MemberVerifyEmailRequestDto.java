package com.gamesnap.backend.dto;

import lombok.Data;

@Data
public class MemberVerifyEmailRequestDto {
    private String email;
    private String verifyCode;

}
