package com.gamesnap.backend.controller;


import java.util.Map;

import com.gamesnap.backend.dto.UpdateProfileRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.gamesnap.backend.dto.MemberRequestDto;
import com.gamesnap.backend.dto.MemberResponseDto;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.service.MemberService;

@Controller
public class MemberController {

    @Autowired
    private MemberService memberService;


    @PostMapping("/login")
    public ResponseEntity<MemberResponseDto> login(@RequestBody MemberRequestDto memberRequestDto) {

        String email = memberRequestDto.getEmail();
        String password = memberRequestDto.getPassword();
        System.out.println("Received email: " + email);
        System.out.println("Received password: " + password);

        return memberService.login(email, password);

    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody MemberRequestDto memberRequestDto){

        String email = memberRequestDto.getEmail();
        String password = memberRequestDto.getPassword();
        String name = memberRequestDto.getName();
        String tel = memberRequestDto.getTel();
        Member member = new Member(email, password, name, tel);

        String registerMessage = memberService.register(member);
        if(registerMessage != null){
            return ResponseEntity.status(401).body(registerMessage);
        }


        return ResponseEntity.ok("회원가입 에 성공하셨습니다!");


    }

    @PostMapping("/check-name")
    public ResponseEntity<Map<String, Object>> checkName(@RequestBody MemberRequestDto memberRequestDto) {
        String name = memberRequestDto.getName();
        return memberService.nameCheck(name);
    }



    @PutMapping("/updateProfile")
    public ResponseEntity<MemberResponseDto> updateProfile(@RequestBody UpdateProfileRequestDto updateProfileRequestDto){

        return memberService.updateProfile(updateProfileRequestDto);



    }
    
}
