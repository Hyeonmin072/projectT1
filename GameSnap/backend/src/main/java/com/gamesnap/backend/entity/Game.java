package com.gamesnap.backend.entity;

import jakarta.persistence.*;

@Entity
public class Game {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "g_id")
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name = "g_genre")
    private Genre genre = Genre.NO;

    @Column(name = "g_name")
    private String name;
}
