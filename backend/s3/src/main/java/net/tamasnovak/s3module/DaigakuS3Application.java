/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.s3module;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * The S3 module's entrypoint.
 */
@SpringBootApplication
@EnableRabbit
@EnableScheduling
public class DaigakuS3Application {
	public static void main(String[] args) {
		SpringApplication.run(DaigakuS3Application.class, args);
	}
}
