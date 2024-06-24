package net.tamasnovak.rabbitmq.configuration.rabbitmq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.handler.annotation.support.DefaultMessageHandlerMethodFactory;
import org.springframework.messaging.handler.annotation.support.MessageHandlerMethodFactory;

@Configuration
public class RabbitMQCommonConfig {
	public static final String STUDENT_DATA_PDF_SAVE_EXCHANGE_KEY = "e.student-pdf-save";
	public static final String STUDENT_PDF_SAVE_QUEUE_KEY = "q.student-pdf-save";
	public static final String STUDENT_PDF_SAVE_ROUTING_KEY = "r.student-pdf-save";

	@Bean
	public TopicExchange exchange() {
		return new TopicExchange(STUDENT_DATA_PDF_SAVE_EXCHANGE_KEY);
	}

	@Bean
	public Queue studentPdfSaveQueue() {
		return new Queue(STUDENT_PDF_SAVE_QUEUE_KEY, true);
	}

	@Bean
	public Binding studentPdfSaveBinding(Queue studentPdfSaveQueue, TopicExchange exchange) {
		return createBinding(studentPdfSaveQueue, exchange, STUDENT_PDF_SAVE_ROUTING_KEY);
	}

	private Binding createBinding(Queue queue, TopicExchange exchange, String routingKey) {
		return BindingBuilder.bind(queue).to(exchange).with(routingKey);
	}

	@Bean
	public Jackson2JsonMessageConverter jacksonMessageConverter() {
		return new Jackson2JsonMessageConverter();
	}

	@Bean
	public RabbitTemplate rabbitTemplate(final ConnectionFactory connectionFactory) {
		final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);

		rabbitTemplate.setMessageConverter(jacksonMessageConverter());

		return rabbitTemplate;
	}

	@Bean
	public MappingJackson2MessageConverter consumerJackson2MessageConverter() {
		return new MappingJackson2MessageConverter();
	}

	@Bean
	MessageHandlerMethodFactory messageHandlerMethodFactory() {
		DefaultMessageHandlerMethodFactory messageHandlerMethodFactory = new DefaultMessageHandlerMethodFactory();
		messageHandlerMethodFactory.setMessageConverter(consumerJackson2MessageConverter());

		return messageHandlerMethodFactory;
	}

}
