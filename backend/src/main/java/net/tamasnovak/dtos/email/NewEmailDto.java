package net.tamasnovak.dtos.email;

public record NewEmailDto(
  String recipient,
  String subject,
  String body
) {}
