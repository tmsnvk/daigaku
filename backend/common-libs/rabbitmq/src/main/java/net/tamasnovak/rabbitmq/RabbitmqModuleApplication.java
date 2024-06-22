package net.tamasnovak.rabbitmq;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableRabbit
public class RabbitmqModuleApplication {
	public static void main(String[] args) {
		SpringApplication.run(RabbitmqModuleApplication.class, args);
	}
}
