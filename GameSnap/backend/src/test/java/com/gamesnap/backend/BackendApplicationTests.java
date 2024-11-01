package com.gamesnap.backend;

import com.gamesnap.backend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private MemberRepository userRepository;
//	@Test
//	void contextLoads() {
//	}


}
