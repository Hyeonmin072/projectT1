package com.gamesnap.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.gamesnap.backend.dto.MemberRequestDto;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.service.MemberService;

@Controller
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody MemberRequestDto memberRequestDto) {

        String email = memberRequestDto.getEmail();
        String password = memberRequestDto.getPassword();
        System.out.println("Received email: " + email);
        System.out.println("Received password: " + password);

        return memberService.login(email, password);

    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody  MemberRequestDto memberRequestDto){
        String email = memberRequestDto.getEmail();
        String password = memberRequestDto.getPassword();
        String tel = memberRequestDto.getTel();
        String name = memberRequestDto.getName();
        Member member = new Member(email, password, tel, name);

        return memberService.register(member);
    }

    @PostMapping("/check-name")
    public ResponseEntity<String> checkName(@RequestBody String name){
        return memberService.nameCheck(name);
    }


    @GetMapping("/")
    public String home(){
        return "redirect:/index";
    }

    @GetMapping("/profile")
    public ResponseEntity<String> getProfile(@RequestBody MemberRequestDto memberRequestDto) {
        String id = MemberRequestDto.getId();

        if (id != null) {
            return ResponseEntity.ok(id); // 프로필이 존재할 경우 200 OK 응답
        } else {
            return ResponseEntity.notFound().build(); // 프로필이 없을 경우 404 Not Found 응답
        }
    }
    
}
