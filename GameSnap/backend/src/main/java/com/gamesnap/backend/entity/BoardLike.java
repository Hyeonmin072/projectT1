package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class BoardLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bl_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "m_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "b_id")
    private Board board;

    protected BoardLike() {
    }

    public BoardLike(Member member, Board board) {
        this.member = member;
        this.board = board;
    }
}

