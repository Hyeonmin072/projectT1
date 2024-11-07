package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Game {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "g_id")
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "g_genre")
    private Genre genre = Genre.NO;

    @Column(name = "g_name")
    private String name;

    protected Game() {
    }

    public Game(Genre genre, String name) {
        this.genre = genre;
        this.name = name;
    }
}
