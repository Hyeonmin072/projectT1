package com.gamesnap.backend.service;

import java.util.*;

import com.gamesnap.backend.dto.MemberResponseDto;
import com.gamesnap.backend.entity.MemberGame;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.repository.MemberRepository;


@Service
@Transactional
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public ResponseEntity<MemberResponseDto> login(String email, String password) {
        MemberResponseDto memberResponseDto;
        Optional<Member> result = memberRepository.findByEmail(email);//로그인 시, 회원이 가입이 되어 있는지 확인

        if (result.isEmpty()) { //이 이메일로 가입한 회원 없음, 로그인 실패!
            return ResponseEntity.status(401).body(null);
        }

        Member member = result.get(); //멤버를 꺼냄
        if (member.getPassword().equals(password)) { //입력받은 패스워드가 이메일로 찾은 회원의 이메일과 같으면 성공
            List<String> gamesId = new ArrayList<>();
            for (MemberGame data : member.getMemberGames()){
                    gamesId.add(""+data.getGame().getId());
            }

            memberResponseDto = new MemberResponseDto(member.getId(),member.getEmail(),member.getPassword(),member.getName(),member.getTel(),member.getImage(),member.getContent(),
                    gamesId
            );
            return ResponseEntity.ok(memberResponseDto);
        } else { // 아니면 실패
            return ResponseEntity.status(401).body(null);
        }
    }

    public String register(Member member) {

        Optional<Member> result = memberRepository.findByEmail(member.getEmail());
        Member checkMember=null;
        if(result.isPresent()){
            checkMember = result.get();
        }


        String email = member.getEmail();
        String password = member.getPassword();
        String name = member.getName();
        String tel = member.getTel();


        if(email == null && !email.matches("^[A-Za-z0-9+_.-]+@(.+)$")){
            return "유효하지 않은 이메일입니다.";
        }
        if(password == null && password.length() < 8){
            return "비밀번호는 최소 8자 이상이어야 합니다.";
        }
        if(name == null || name.isEmpty()){
            return "이름을 입력해야 합니다.";
        }
        if(tel == null || tel.isEmpty()){
            return "전화번호를 입력해야 합니다.";
        }
        if(checkMember != null &&  checkMember.getEmail().equals(email)){
            return "이미 사용중인 이메일입니다.";
        }

        this.memberRepository.save(member);
        return null;
    }

    public ResponseEntity<Map<String, Object>> nameCheck(String name) {
        Optional<Member> result = memberRepository.findByName(name);

        Map<String, Object> response = new HashMap<>();
        if (result.isEmpty()) { // 중복되는 닉네임이 없으므로 사용 가능
            response.put("available", true);
            response.put("message", "사용 가능한 닉네임입니다.");
        } else { // 닉네임이 중복됨
            response.put("available", false);
            response.put("message", "이미 존재하는 이름입니다.");
        }
        return ResponseEntity.ok(response);
    }


    // 회원 정보 저장 메소드
    public Member save(Member member) {
        return memberRepository.save(member);
    }

    // 회원 정보 조회 메소드
    public Member findId(Integer memberId) {
        return memberRepository.findById(memberId).orElse(null); // Optional 처리
    }
}
