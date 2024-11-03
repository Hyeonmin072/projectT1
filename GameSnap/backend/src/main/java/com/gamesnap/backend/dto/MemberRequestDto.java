package com.gamesnap.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberRequestDto {
    private String email;
    private String password;
    private String tel;
    private String name;
}
