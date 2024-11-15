package com.gamesnap.backend.dto;

import java.time.LocalDate;
import java.util.List;

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
    private List<String> gamesName;
    private List<Integer> gamesId;



    public MemberResponseDto(Integer id ,String email, String password, String name, String tel,String image,String content,List<Integer> gamesId,List<String> gamesName) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.tel = tel;
        this.image = image;
        this.content = content;
        this.gamesId = gamesId;
        this.gamesName = gamesName;
        this.createdate = LocalDate.now();
    }



//    public MemberResponseDto(Integer id, String name, String email, String password, String image, String tel,
//            List<String> memberGames) {
//        this.image = image;
//        this.id = id;
//        this.name = name;
//        this.email = email;
//        this.password = password;
//        this.tel = tel;
//        this.memberGames = memberGames;
//    }

    
}
