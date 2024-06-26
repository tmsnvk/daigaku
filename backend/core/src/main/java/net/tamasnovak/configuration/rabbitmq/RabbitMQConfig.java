package net.tamasnovak.configuration.rabbitmq;

import net.tamasnovak.rabbitmq.configuration.rabbitmq.ConverterConfig;
import net.tamasnovak.rabbitmq.service.queueSender.QueueSender;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({ ConverterConfig.class, QueueSender.class })
public class RabbitMQConfig {}
