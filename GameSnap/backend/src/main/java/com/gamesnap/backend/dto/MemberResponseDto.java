package com.gamesnap.backend.dto;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
@Data
@Getter
public class MemberResponseDto {
    private Integer id;
    private String name;
    private String email;
    private String password;
    private String image;
    private String content;
    private String tel;
    private LocalDate createdate;
    private List<String> memberGames;



    public MemberResponseDto(Integer id ,String email, String password, String name, String tel,String image,String content,List<String> memberGames) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.tel = tel;
        this.image = image;
        this.content = content;
        this.memberGames = memberGames;
        this.createdate = LocalDate.now();
    }
}
