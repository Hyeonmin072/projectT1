package com.gamesnap.backend.service;

import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;


@Service
@Transactional
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public ResponseEntity<String> login(String email, String password) {
        //로그인 로직, 회원이 가입 되어있는지 확인
        boolean result = isMemberJoined(email,password);

        if (result) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Login failed");
        }
    }

    public boolean isMemberJoined(String email, String password) {
        // 사용자 조회 및 비밀번호 확인 로직
        Member member = memberRepository.findByEmail(email);
        return member != null && member.getPassword().equals(password);

    }
}
