package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class MemberGame {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mg_id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "m_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "g_id")
    private Game game;

    protected MemberGame(){

    }
    public MemberGame(Member member, Game game){
        this.member=member;
        this.game=game;
    }
}
