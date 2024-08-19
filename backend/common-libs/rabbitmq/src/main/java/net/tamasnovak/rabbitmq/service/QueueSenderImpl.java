package net.tamasnovak.rabbitmq.service;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class QueueSenderImpl implements QueueSender {
	private final RabbitTemplate rabbitTemplate;

	@Autowired
	public QueueSenderImpl(RabbitTemplate rabbitTemplate) {
		this.rabbitTemplate = rabbitTemplate;
	}

	public <T> void send(final String exchangeKey, final String routingKey, final T messageDto) {
		this.rabbitTemplate.convertAndSend(exchangeKey, routingKey, messageDto);
	}
}
