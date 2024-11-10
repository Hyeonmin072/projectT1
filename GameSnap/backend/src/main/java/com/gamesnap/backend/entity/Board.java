package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<BoardComment> comments = new ArrayList<>();

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

    public void increaseView() {
        this.view++;
    }
}
