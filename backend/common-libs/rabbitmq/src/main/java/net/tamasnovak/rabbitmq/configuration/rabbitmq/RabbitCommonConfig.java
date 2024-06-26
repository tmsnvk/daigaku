package net.tamasnovak.rabbitmq.configuration.rabbitmq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;

public class RabbitCommonConfig {
	public Binding createBinding(Queue queue, TopicExchange exchange, String routingKey) {
		return BindingBuilder.bind(queue).to(exchange).with(routingKey);
	}
}
