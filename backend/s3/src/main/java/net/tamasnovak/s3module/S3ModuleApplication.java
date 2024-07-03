package net.tamasnovak.s3module;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableRabbit
@EnableScheduling
public class S3ModuleApplication {
	public static void main(String[] args) {
		SpringApplication.run(S3ModuleApplication.class, args);
	}
}
