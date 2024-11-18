package com.gamesnap.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class UpdateProfileRequestDto {
    private Integer id;                // 매핑: id
    private String name;               // 매핑: name
    private List<Integer> likeGamesId;  // 매핑: JSON.stringify -> List
    private List<String> likeGamesName;
    private String content;            // 매핑: content
}
