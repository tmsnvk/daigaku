/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.email.configuration;

import net.tamasnovak.rabbitmq.configuration.rabbitmq.ConverterConfig;
import net.tamasnovak.rabbitmq.service.QueueSenderImpl;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({ ConverterConfig.class, QueueSenderImpl.class })
public class RabbitMQConfig {}
