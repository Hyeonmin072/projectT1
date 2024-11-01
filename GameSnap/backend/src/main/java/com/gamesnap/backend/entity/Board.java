package com.gamesnap.backend.entity;

import jakarta.persistence.*;

@Entity
public class Board {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "b_id")
    private Integer id;

    @Column(name = "b_title")
    private String title;

    @Column(name = "b_content")
    private String content;

    @Column(name = "b_createdate")
    private String createDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "m_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "g_id")
    private Game game;
}
