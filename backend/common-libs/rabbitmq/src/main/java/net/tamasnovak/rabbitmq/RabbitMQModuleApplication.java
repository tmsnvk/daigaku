/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.rabbitmq;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The RabbitMQ module's entrypoint.
 */
@SpringBootApplication
@EnableRabbit
public class RabbitMQModuleApplication {
	public static void main(String[] args) {
		SpringApplication.run(RabbitMQModuleApplication.class, args);
	}
}
