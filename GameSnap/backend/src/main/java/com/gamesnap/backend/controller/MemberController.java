package com.gamesnap.backend.controller;


import java.util.List;
import java.util.Map;

import com.gamesnap.backend.dto.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.service.MemberService;

@RestController
@Slf4j
public class MemberController {

    @Autowired
    private MemberService memberService;


    @PostMapping("/login")
    public ResponseEntity<MemberResponseDto> login(@RequestBody MemberRequestDto memberRequestDto, HttpSession session, HttpServletResponse response) {
        String email = memberRequestDto.getEmail();
        String password = memberRequestDto.getPassword();
        System.out.println("Received email: " + email);
        System.out.println("Received password: " + password);

        ResponseEntity<MemberResponseDto> loginResponse = memberService.login(email, password);
        log.info("로그 왜 안떠");
        if (loginResponse.getStatusCode().is2xxSuccessful()) {
            log.info("Login successful");
            MemberResponseDto member = loginResponse.getBody();
            session.setAttribute("member", member);
            
            // 쿠키 생성
            Cookie sessionCookie = new Cookie("JSESSIONID", session.getId());
            sessionCookie.setPath("/"); // 모든 경로에서 이 쿠키 사용가능
            sessionCookie.setMaxAge(3600); // 1시간 유효
            sessionCookie.setHttpOnly(false); // 클라이언트 측에서 접근할 수 있게 함
            response.addCookie(sessionCookie);
        }

        return loginResponse;

    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session, HttpServletResponse response) {
        session.invalidate(); // 세션 무효화

        // 쿠키 삭제
        Cookie sessionCookie = new Cookie("JSESSIONID", null);
        sessionCookie.setPath("/");
        sessionCookie.setMaxAge(0); // 유효기간 0 = 즉시삭제
        sessionCookie.setHttpOnly(false);
        response.addCookie(sessionCookie);


        return ResponseEntity.ok("로그아웃 되었습니다.");
    }


    @PostMapping("/sendEmail")
    public ResponseEntity<String> sendEmail(@RequestBody MemberEmailRequestDto requestDto){
        memberService.sendCodeToEmail(requestDto.getEmail());
        return ResponseEntity.ok("전송된 코드를 이메일에서 확인해주세요");
    }

    @PostMapping("/verifyEmail")
    public ResponseEntity<MemberVerifyEmailResponseDto> verifyEmail(@RequestBody MemberVerifyEmailRequestDto requestDto){
        boolean isVerified = memberService.verifyCode(requestDto.getEmail(),requestDto.getVerifyCode());
        MemberVerifyEmailResponseDto responseDto = new MemberVerifyEmailResponseDto();
        responseDto.setVerified(isVerified);
        responseDto.setMessage(isVerified ? "이메일 인증에 성공하셨습니다" : "이메일 인증에 실패하셨습니다");
        if(isVerified){return ResponseEntity.status(200).body(responseDto);}
        else {return ResponseEntity.status(200).body(responseDto);}
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


        return ResponseEntity.ok("회원가입에 성공하셨습니다!");


    }

    @PostMapping("/check-name")
    public ResponseEntity<Map<String, Object>> checkName(@RequestBody MemberRequestDto memberRequestDto) {
        String name = memberRequestDto.getName();
        return memberService.nameCheck(name);
    }




    //이름으로 친구 조회
    @GetMapping("/search/member")
    public List<MemberSimpleDto> searchFriends(@RequestParam String nickName, @RequestParam Integer memberId){
        return memberService.searchFriendsByName(nickName, memberId);
    }

    //내 친구 조회
    @GetMapping("/friend")
    public List<MemberSimpleDto> findFriends(@RequestParam Integer myId){
        return memberService.searchFriend(myId);
    }
    

    //친구 요청 보내기
    @PostMapping("/friend/request")
    public ResponseEntity<String> sendFriendRequest(@RequestParam("myId") Integer myId, @RequestParam("receiveMemberId") Integer receiveMemberId) {
        return memberService.sendFriendRequest(myId, receiveMemberId);
    }

    //나에게 온 친구 요청 조회
    @GetMapping("/friend/request")
    public ResponseEntity<List<MemberSimpleDto>> findFriendRequests(@RequestParam Integer myId){
        return memberService.searchFriendRequests(myId);
    }
    
    //나에게 온 친구 요청 삭제(거부)
    @PostMapping("/friend/request/delete")
    public ResponseEntity<String> deleteFriendRequest(@RequestParam("myId") Integer myId, @RequestParam("sendMemberId") Integer sendMemberId){
        return memberService.deleteFriendRequest(myId, sendMemberId);
    }

    
    //친구 추가
    @PostMapping("/friend")
    public ResponseEntity<String> addFriends(@RequestParam("myId") Integer myId, @RequestParam("targetUserId") Integer friendId) {
        return memberService.addFriend(myId, friendId);
    }


    //친구 삭제
    @PostMapping("/friend/delete")
    public ResponseEntity<String> deleteFriends(@RequestParam Integer myId, @RequestParam("targetUserId") Integer friendId){
        return memberService.deleteFriend(myId, friendId);
    }
    
}
