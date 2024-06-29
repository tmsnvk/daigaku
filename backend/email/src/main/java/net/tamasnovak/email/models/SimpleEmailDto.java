package net.tamasnovak.email.models;

public record SimpleEmailDto(
	String recipient,
	String subject,
	String body
) {}
