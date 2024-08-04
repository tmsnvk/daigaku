package net.tamasnovak.email;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableRabbit
public class DaigakuEmailApplication {
	public static void main(String[] args) {
		SpringApplication.run(DaigakuEmailApplication.class, args);
	}
}
