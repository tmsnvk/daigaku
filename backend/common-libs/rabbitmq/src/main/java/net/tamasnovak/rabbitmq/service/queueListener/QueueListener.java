package net.tamasnovak.rabbitmq.service.queueListener;

import net.tamasnovak.rabbitmq.configuration.rabbitmq.PdfSaveRabbitConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.amqp.SimpleRabbitListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class QueueListener {
	private final RabbitTemplate rabbitTemplate;

	@Autowired
	public QueueListener(RabbitTemplate rabbitTemplate) {
		this.rabbitTemplate = rabbitTemplate;
	}

//	@RabbitListener(queues = { "#queueName" })
//	public <T> void startListening(String queueName, T message) {
//		this.rabbitTemplate.convertSendAndReceive(message);
//	}
//
//
//	@RabbitListener(queues = { PdfSaveRabbitConfig.STUDENT_PDF_SAVE_QUEUE_KEY })
//	public void receiveMessage(String message) {
//		System.out.println(message);
//	}
}
