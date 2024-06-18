package net.tamasnovak.rabbitmq.service.queueSender;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class QueueSender {
	private final RabbitTemplate rabbitTemplate;

	@Autowired
	public QueueSender(RabbitTemplate rabbitTemplate) {
		this.rabbitTemplate = rabbitTemplate;
	}

	public <T> void send(String exchangeKey, String routingKey, T messageDto) {
		this.rabbitTemplate.convertAndSend(exchangeKey, routingKey, messageDto);
	}
}
