package com.gamesnap.backend;

import com.gamesnap.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private UserRepository userRepository;
//	@Test
//	void contextLoads() {
//	}


}
