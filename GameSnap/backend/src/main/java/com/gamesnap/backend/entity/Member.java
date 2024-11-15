package com.gamesnap.backend.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "m_id")
    private Integer id;

    @Column(name = "m_name")
    private String name;

    @Column(name = "m_email")
    private String email;

    @Column(name = "m_password")
    private String password;

    @Column(name = "m_image")
    private String image;

    @Column(name = "m_content")
    private String content;

    @Column(name = "m_tel")
    private String tel;


    @Column(name = "m_createdate")
    private LocalDate createdate;


    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<MemberGame> memberGames = new ArrayList<>();


    public Member() {
    }

    public Member(String email, String password, String name, String tel) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.tel = tel;
        this.createdate = LocalDate.now();
    }

    public void MemberUpdate(String email, String password, String name, String tel,String image,String content,List<MemberGame> memberGames) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.tel = tel;
        this.image = image;
        this.content = content;
        this.memberGames = memberGames;
    }


}
