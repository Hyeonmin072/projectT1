package com.gamesnap.backend.service;

import java.util.Optional;

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

    public ResponseEntity<String> login(String email, String password) {
        Optional<Member> result = memberRepository.findByEmail(email);//로그인 시, 회원이 가입이 되어 있는지 확인

        if (result.isEmpty()) { //이 이메일로 가입한 회원 없음, 로그인 실패!
            return ResponseEntity.status(401).body("로그인 실패");
        }

        Member member = result.get(); //멤버를 꺼냄

        if (member.getPassword().equals(password)) { //입력받은 패스워드가 이메일로 찾은 회원의 이메일과 같으면 성공
            return ResponseEntity.ok("로그인 성공");
        } else { // 아니면 실패
            return ResponseEntity.status(401).body("로그인 실패");
        }
    }

    public ResponseEntity<String> register(Member member) {

        Optional<Member> result = memberRepository.findByEmail(member.getEmail());

        if(result.isEmpty()){ // 비어 있을 때 = 이 이메일로 가입한 회원이 없으므로 가입 가능
            this.memberRepository.save(member);
            return ResponseEntity.ok("회원가입 완료!");
        } else { // 안 비어 있을 때 = 이 이메일로 가입한 회원이 이미 있음
            return ResponseEntity.status(401).body("이미 존재하는 이메일입니다.");
        }
    }

    public ResponseEntity<String> nameCheck(String name){
        Optional<Member> result = memberRepository.findByName(name);

        if(result.isEmpty()){ // 중복되는 닉네임이 없으므로 사용가능
            return ResponseEntity.ok(name);
        } else { // 닉네임이 중복됨
            return ResponseEntity.status(401).body("이미 존재하는 이름입니다.");
        }
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
