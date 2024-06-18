package net.tamasnovak.rabbitmq.service.queueListener;

import net.tamasnovak.rabbitmq.configuration.rabbitmq.RabbitMQCommonConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.MessageHandler;
import org.springframework.stereotype.Component;

@Component
public class QueueListener {
	private final RabbitTemplate rabbitTemplate;

	@Autowired
	public QueueListener(RabbitTemplate rabbitTemplate) {
		this.rabbitTemplate = rabbitTemplate;
	}

//	@RabbitListener(queues = { "#queueName" }, containerFactory = "rabbitListenerContainerFactory")
//	public <T> void startListening(String queueName, T message) {
////		rabbitTemplate.setConnectionFactory();
//	}


//	@RabbitListener(queues = { RabbitMQCommonConfig.STUDENT_PDF_SAVE_QUEUE_KEY })
//	public void receiveMessage(String message) {
//		System.out.println(message);
//	}
}
