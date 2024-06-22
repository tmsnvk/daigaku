package net.tamasnovak.s3module;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableRabbit
public class S3ModuleApplication {
	public static void main(String[] args) {
		SpringApplication.run(S3ModuleApplication.class, args);
	}
}
