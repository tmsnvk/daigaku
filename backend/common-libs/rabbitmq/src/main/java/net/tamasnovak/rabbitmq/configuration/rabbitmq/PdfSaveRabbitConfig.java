package net.tamasnovak.rabbitmq.configuration.rabbitmq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;

@Configuration
public class PdfSaveRabbitConfig extends RabbitCommonConfig {
	public static final String STUDENT_PDF_SAVE_EXCHANGE_KEY = "pdf-saving-topic-exchange";

	public static final String STUDENT_PDF_SAVE_QUEUE_KEY = "q.student-pdf-save";
	public static final String STUDENT_PDF_SAVE_ROUTING_KEY = "r.student-pdf-save";

	@Bean
	public TopicExchange pdfSavingTopicExchange() {
		return new TopicExchange(STUDENT_PDF_SAVE_EXCHANGE_KEY);
	}

	@Bean
	public Queue studentPdfSaveQueue() {
		return new Queue(STUDENT_PDF_SAVE_QUEUE_KEY, true);
	}

	@Bean
	@DependsOn(value = { "pdfSavingTopicExchange", "studentPdfSaveQueue" })
	public Binding studentPdfSaveBinding(Queue studentPdfSaveQueue, TopicExchange pdfSavingTopicExchange) {
		return createBinding(studentPdfSaveQueue, pdfSavingTopicExchange, STUDENT_PDF_SAVE_ROUTING_KEY);
	}
}
