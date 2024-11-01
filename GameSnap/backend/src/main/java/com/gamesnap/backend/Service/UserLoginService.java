package com.gamesnap.backend.Service;

import com.gamesnap.backend.Entity.Member;
import com.gamesnap.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class UserLoginService {

    @Autowired
    private UserRepository userRepository;
    public List<Member> getUser(){
        return userRepository.findAll();
    }

    public boolean authenticate(String email, String password) {
        // 사용자 조회 및 비밀번호 확인 로직
        Member member = userRepository.findByEmail(email);
        return member != null && member.getPassword().equals(password);

    }
}
