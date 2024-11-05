package com.gamesnap.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data

public class MemberRequestDto {
    private String id;
    private String email;
    private String password;
    private String name;
    private String tel;
    public MemberRequestDto(String email, String password,String name, String tel){
        this.email=email;
        this.password=password;
        this.name=name;
        this.tel=tel;
    }

    public MemberRequestDto(String name){
        this.name=name;
    }
}
