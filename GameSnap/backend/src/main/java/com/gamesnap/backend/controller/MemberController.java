package com.gamesnap.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.gamesnap.backend.dto.MemberRequestDto;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.service.MemberService;


import java.util.Map;

@Controller
public class MemberController {

    @Autowired
    private MemberService memberService;


    @PostMapping("/login")
    public ResponseEntity<Member> login(@RequestBody MemberRequestDto memberRequestDto) {

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


    @GetMapping("/")
    public String home(){
        return "redirect:/index";
    }

    @PostMapping("/home")
    public ResponseEntity<Member> registerMember(@RequestBody MemberRequestDto memberRequestDto) {
    Member newUser = new Member(
        memberRequestDto.getName(),
        memberRequestDto.getTel(),
        memberRequestDto.getEmail(),
        "Action" // 기본 값 혹은 선택된 장르
    );
    memberService.save(newUser); // 저장 로직
    return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @GetMapping("/profile")
    public ResponseEntity<Member> getProfile(@RequestParam Integer memberId) {
        Member userProfile = memberService.findId(memberId);
        if (userProfile != null) {
            return ResponseEntity.ok(userProfile);
        } else {
            return ResponseEntity.notFound().build(); // 회원을 찾을 수 없는 경우
        }
    }    
    
}
