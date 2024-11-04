package com.gamesnap.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.gamesnap.backend.dto.MemberRequestDto;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.profile.Passwordupdate;
import com.gamesnap.backend.profile.Userprofile;
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
    public ResponseEntity<Userprofile> getProfile() {
        Userprofile userprofile = new Userprofile("홍길동", "010-1234-5678", "example@example.com", "Action");
        return ResponseEntity.ok(userprofile);
    }
    
    @PostMapping("/update")
    public ResponseEntity<Userprofile> updateProfile(@RequestBody Userprofile updatUserprofile) {
        // 프로필 업데이트 로직
        
        return ResponseEntity.ok(updatUserprofile);
    }
    
    @PostMapping("/updatePW")
    public ResponseEntity<String> updatedPW(@RequestBody Passwordupdate ps) {
        // 비밀번호 변경 로직
        
        return ResponseEntity.ok("비밀번호 변경이 완료되었습니다.");
    }
    
}
