package com.gamesnap.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@Entity
@Getter
public class Game {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "g_id")
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "g_genre",length = 50)
    private Genre genre = Genre.NO;

    @Column(name = "g_name")
    private String name;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<MeberGame> memberGames;

    protected Game() {
    }

    public Game(Genre genre, String name) {
        this.genre = genre;
        this.name = name;
    }
}
