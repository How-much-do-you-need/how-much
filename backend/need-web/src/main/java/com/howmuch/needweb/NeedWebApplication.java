package com.howmuch.needweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Controller
@EnableTransactionManagement
@SpringBootApplication
public class NeedWebApplication {

	public static void main(String[] args) {
		System.out.println("how much do you need project start!");
		SpringApplication.run(NeedWebApplication.class, args);
	}

}
