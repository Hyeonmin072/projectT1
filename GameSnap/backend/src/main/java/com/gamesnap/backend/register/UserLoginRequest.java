package com.gamesnap.backend.register;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginRequest {
    private String email;
    private String password;
}
