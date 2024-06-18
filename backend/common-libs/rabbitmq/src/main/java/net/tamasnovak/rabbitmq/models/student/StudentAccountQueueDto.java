package net.tamasnovak.rabbitmq.models.student;

public record StudentAccountQueueDto(
	String fullName,
	String email,
	String institutionName
) {}
