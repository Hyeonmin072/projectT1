package com.gamesnap.backend.controller;


import com.gamesnap.backend.dto.MemberRequestDto;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
    public ResponseEntity<String> chkeckName(@RequestBody String name){
        return memberService.nameCheck(name);
    }


    @GetMapping("/")
    public String home(){
        return "redirect:/index";
    }
}
