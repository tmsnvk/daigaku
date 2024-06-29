package net.tamasnovak.rabbitmq.service;

public interface QueueSender {
	<T> void send(String exchangeKey, String routingKey, T messageDto);
}
