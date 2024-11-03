package com.gamesnap.backend.service;

import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


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

    public ResponseEntity<String> register(String email, String password, String tel, String name){

        int result = isEmailAndNameChecked(email,name);

        if(result == 1){
            Member member = new Member();
            member.setEmail(email);
            member.setPassword(password);
            member.setTel(tel);
            member.setName(name);

            this.memberRepository.save(member);
            return ResponseEntity.ok("회원가입 완료");
        }else if(result == -1){
            return ResponseEntity.status(401).body("이미 존재하는 이름과, 닉네임입니다.");
        }else if(result == 2){
            return ResponseEntity.status(401).body("이미 존재하는 이름 입니다.");
        }else {
            return ResponseEntity.status(401).body("이미 존재하는 이메일 입니다.");
        }

    }

    public ResponseEntity<String> nameCheck(String name){
        Member member = memberRepository.findByName(name);
        if(member == null){
            return ResponseEntity.ok(name);
        }else{
            return ResponseEntity.status(401).body("이미 존재하는 이름입니다.");
        }
    }

    public boolean isMemberJoined(String email, String password) {
        // 사용자 조회 및 비밀번호 확인 로직
        Member member = memberRepository.findByEmail(email);
        return member != null && member.getPassword().equals(password);

    }

    int isEmailAndNameChecked(String email,String name){

        Member emailCheck = memberRepository.findByEmail(email);
        Member nameCheck = memberRepository.findByName(name);
        if(emailCheck == null && nameCheck == null){
            return 1;   //이메일 ,이름이 없을경우
        }else if (nameCheck != null && emailCheck != null){
          return -1; // 이메일, 이름 둘 다 있을경우
        } else if(nameCheck != null){
            return 2; // 이름이 있을경우
        }else {
            return 3; // 이메일 있을경우
        }


    }
}
