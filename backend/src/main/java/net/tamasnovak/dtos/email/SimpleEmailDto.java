package net.tamasnovak.dtos.email;

public record SimpleEmailDto(
  String recipient,
  String subject,
  String body
) {}
