/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.email;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The Email module's entrypoint.
 */
@SpringBootApplication
@EnableRabbit
public class DaigakuEmailApplication {
	public static void main(String[] args) {
		SpringApplication.run(DaigakuEmailApplication.class, args);
	}
}
