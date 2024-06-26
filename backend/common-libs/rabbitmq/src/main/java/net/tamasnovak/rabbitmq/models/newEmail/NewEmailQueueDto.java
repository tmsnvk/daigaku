package net.tamasnovak.rabbitmq.models.newEmail;

public record NewEmailQueueDto(
	String recipient,
	String subject,
	String body
) {}
