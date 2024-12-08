/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
 *
 * @since 0.0.1
 */
@Configuration
@Import({ ConverterConfig.class, QueueSenderImpl.class })
public class RabbitQueueConfiguration {
}