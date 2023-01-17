package com.howmuch.needweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@EnableTransactionManagement
@SpringBootApplication
public class NeedWebApplication {

	public static void main(String[] args) {
		System.out.println("how much do you need project start!");
		SpringApplication.run(NeedWebApplication.class, args);
	}

	@GetMapping("/")
	public String welcome(@CookieValue(name = "id", defaultValue = "") String id, Model model) {
		model.addAttribute("id", id);
		return "main";
	}

}
