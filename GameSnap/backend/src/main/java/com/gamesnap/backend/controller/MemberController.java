package com.gamesnap.backend.controller;


import java.util.List;
import java.util.Map;

import com.gamesnap.backend.dto.MemberSimpleDto;
import com.gamesnap.backend.dto.UpdateProfileRequestDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gamesnap.backend.dto.MemberRequestDto;
import com.gamesnap.backend.dto.MemberResponseDto;
import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.service.MemberService;

@RestController
@Slf4j
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


        return ResponseEntity.ok("회원가입에 성공하셨습니다!");


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

    //이름으로 친구 조회
    @GetMapping("/search/member")
    public List<MemberSimpleDto> searchFriends(@RequestParam String nickName, @RequestParam Integer memberId){
        return memberService.searchFriendsByName(nickName, memberId);
    }

    //친구 조회
    @GetMapping("/friend")
    public List<MemberSimpleDto> findFriends(@RequestParam Integer myId){
        return memberService.searchFriend(myId);
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
