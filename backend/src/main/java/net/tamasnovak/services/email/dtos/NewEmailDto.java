package net.tamasnovak.services.email.dtos;

public record NewEmailDto(
  String recipient,
  String subject,
  String body
) {}
