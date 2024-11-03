package com.gamesnap.backend.entity;

import jakarta.persistence.*;

@Entity
public class MessageRoom {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "msr_id")
    private Integer id;

    @Column(name = "msr_name")
    private String name;
}
