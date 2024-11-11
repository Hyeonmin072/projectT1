package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;

@Entity
@Getter
public class BoardComment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "bc_id")
    private Integer id;

    @Column(name = "bc_comment")
    private String comment;

    @Column(name = "bc_createdate")
    private LocalDate createDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "b_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "m_id")
    private Member member;

    protected BoardComment() {
    }

    public BoardComment(String comment, Board board, Member member) {
        this.comment = comment;
        this.createDate = LocalDate.now();
        this.board = board;
        this.member = member;
    }
}
