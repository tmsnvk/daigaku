/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.configuration.rabbitmq;

import net.tamasnovak.rabbitmq.configuration.rabbitmq.ConverterConfig;
import net.tamasnovak.rabbitmq.service.QueueSenderImpl;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

/**
 * Rabbit messaging queue configuration class.
 */
@Configuration
@Import({ ConverterConfig.class, QueueSenderImpl.class })
public class RabbitQueueConfiguration {
}
