package net.tamasnovak;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
@EnableRabbit
public class DaigakuBackendApplication {
  public static void main(String[] args) {
    SpringApplication.run(DaigakuBackendApplication.class, args);
  }
}
