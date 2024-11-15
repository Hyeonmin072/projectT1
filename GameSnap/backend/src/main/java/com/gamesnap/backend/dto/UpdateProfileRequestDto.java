package com.gamesnap.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class UpdateProfileRequestDto {
    private Integer id;                // 매핑: id
    private String email;              // 매핑: email
    private String name;               // 매핑: name
    private String tel;                // 매핑: tel
    private List<Integer> likeGamesId;  // 매핑: JSON.stringify -> List
    private String content;            // 매핑: content
    private String password;           // 매핑: password
}
