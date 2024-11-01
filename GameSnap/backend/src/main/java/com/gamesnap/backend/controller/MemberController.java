package com.gamesnap.backend.controller;


import com.gamesnap.backend.dto.MemberLoginDto;
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
    public ResponseEntity<String> login(@RequestBody MemberLoginDto memberLoginDto) {

        String email = memberLoginDto.getEmail();
        String password = memberLoginDto.getPassword();
        System.out.println("Received email: " + email);
        System.out.println("Received password: " + password);

        return memberService.login(email, password);

    }

    @GetMapping("/")
    public String home(){
        return "redirect:/index";
    }
}
