package com.gamesnap.backend;

import com.gamesnap.backend.entity.Member;
import com.gamesnap.backend.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private MemberRepository memberRepository;
//	@Test
//	void contextLoads() {
//	}

    @Test
    void LoginTest(){
        Member m = new Member();

        m.setEmail("gudtjq363636@naver.com");
        m.setPassword("1234");
        m.setCreatedate(LocalDateTime.now());
        memberRepository.save(m);
    }

}
