package net.tamasnovak.rabbitmq.models.s3PdfQueue.student;

public record StudentAccountDto(
	String fullName,
	String email,
	String institutionName
) {}
