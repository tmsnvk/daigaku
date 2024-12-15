/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

/**
 * The Core module's main class.
 *
 * @since 0.0.1
 */
@SpringBootApplication
@EnableCaching
@EnableRabbit
public class DaigakuCoreApplication {
  public static void main(String[] args) {
    SpringApplication.run(DaigakuCoreApplication.class, args);
  }
}
