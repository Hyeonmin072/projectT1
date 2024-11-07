package com.gamesnap.backend.entity;

import jakarta.persistence.*;

@Entity
public class BoardComment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "bc_id")
    private Integer id;

    @Column(name = "bc_comment")
    private String comment;

    @Column(name = "bc_createdate")
    private String createDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "b_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "m_id")
    private Member member;

    protected BoardComment() {
    }

    public BoardComment(String comment, String createDate, Board board, Member member) {
        this.comment = comment;
        this.createDate = createDate;
        this.board = board;
        this.member = member;
    }
}
