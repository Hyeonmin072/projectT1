package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
public class Video {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "v_id")
    Integer id;

    @Column(name = "v_url")
    String url;

    @Column(name = "v_title")
    String title;

    @Column(name = "v_desc")
    String desc;

    @Column(name = "v_like")
    Integer like;

    @Column(name = "v_createdate")
    LocalDateTime createDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "m_id")
    Member member;

    @Column(name = "v_view")
    Integer view;
}
