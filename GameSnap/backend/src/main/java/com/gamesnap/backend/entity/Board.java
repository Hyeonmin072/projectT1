package com.gamesnap.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;

import java.time.LocalDate;

@Entity
@Getter
public class Board {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "b_id")
    private Integer id;

    @Column(name = "b_title")
    private String title;

    @Column(name = "b_content")
    private String content;

    @Column(name = "b_createdate")
    private LocalDate createDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "m_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "g_id")
    private Game game;

    @Column(name = "b_view")
    private Integer view;

    @Column(name = "b_like")
    private Integer like;

    protected Board() {
    }

    public Board(Game game, Member member, String content, String title) {
        this.view = 0;
        this.like = 0;
        this.game = game;
        this.member = member;
        this.createDate = LocalDate.now();
        this.content = content;
        this.title = title;
    }
}
