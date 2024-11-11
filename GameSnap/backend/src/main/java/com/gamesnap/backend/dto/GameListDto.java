package com.gamesnap.backend.dto;

import com.gamesnap.backend.entity.BoardComment;
import com.gamesnap.backend.entity.Genre;
import com.gamesnap.backend.entity.MemberGame;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameListDto {

    private Integer id;

    private Genre genre;

    private String name;


}
