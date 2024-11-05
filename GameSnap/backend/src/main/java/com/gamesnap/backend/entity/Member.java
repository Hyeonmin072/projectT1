package com.gamesnap.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

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

    public Member() {
    }

    public Member(String email, String password, String name, String tel) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.tel = tel;
        this.createdate = LocalDate.now();
    }
}
