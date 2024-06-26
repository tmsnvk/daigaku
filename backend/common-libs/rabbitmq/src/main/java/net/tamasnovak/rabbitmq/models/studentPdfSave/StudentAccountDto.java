package net.tamasnovak.rabbitmq.models.studentPdfSave;

public record StudentAccountDto(
	String fullName,
	String email,
	String institutionName
) {}
