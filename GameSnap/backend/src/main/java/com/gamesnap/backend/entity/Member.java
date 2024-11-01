package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "m_id")
    private Integer id;

    @Column(name = "m_email")
    private String email;

    @Column(name = "m_password")
    private String password;

    @Column(name = "m_image")
    private String image;

    @Column(name = "m_content")
    private String content;

    @Column(name = "m_createdate")
    private LocalDateTime createdate;

}
