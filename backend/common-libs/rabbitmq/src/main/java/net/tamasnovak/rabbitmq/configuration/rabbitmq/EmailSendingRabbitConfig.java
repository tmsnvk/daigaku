package net.tamasnovak.rabbitmq.configuration.rabbitmq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EmailSendingRabbitConfig extends RabbitCommonConfig {
	public static final String EMAIL_STUDENT_PDF_SAVE_EXCHANGE_KEY = "email-sending-topic-exchange";

	public static final String EMAIL_STUDENT_PDF_SAVE_QUEUE_KEY = "q.student-pdf-save-email";
	public static final String EMAIL_STUDENT_PDF_SAVE_ROUTING_KEY = "r.student-pdf-save-email";

	@Bean
	public TopicExchange emailSendingTopicExchange() {
		return new TopicExchange(EMAIL_STUDENT_PDF_SAVE_EXCHANGE_KEY);
	}

	@Bean
	public Queue emailStudentPdfSaveQueue() {
		return new Queue(EMAIL_STUDENT_PDF_SAVE_QUEUE_KEY, true);
	}

	@Bean
	public Binding emailStudentPdfSaveBinding(Queue emailStudentPdfSaveQueue, TopicExchange emailSendingTopicExchange) {
		return createBinding(emailStudentPdfSaveQueue, emailSendingTopicExchange, EMAIL_STUDENT_PDF_SAVE_ROUTING_KEY);
	}
}
