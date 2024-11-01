package com.gamesnap.backend.controller;


import com.gamesnap.backend.register.UserLoginRequest;
import com.gamesnap.backend.Service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/register")
public class MemberLoginController {

    @Autowired
    private UserLoginService userLoginService;
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginRequest userLoginRequest) {
        String email = userLoginRequest.getEmail();
        String password = userLoginRequest.getPassword();
        System.out.println("Received email: " + userLoginRequest.getEmail());
        System.out.println("Received password: " + userLoginRequest.getPassword());

        boolean isAuthenticated = userLoginService.authenticate(email,password);

        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Login failed");
        }

    }

    @GetMapping("/aa")
    public String aa(){
        return "redirect:/index";
    }
}
