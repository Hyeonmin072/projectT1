package com.gamesnap.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class MemberSimpleDto {
    private Integer id;
    private String name;
}
