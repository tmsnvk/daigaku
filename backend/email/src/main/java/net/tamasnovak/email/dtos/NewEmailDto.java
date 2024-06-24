package net.tamasnovak.email.dtos;

public record NewEmailDto(
  String recipient,
  String subject,
  String body
) {}
