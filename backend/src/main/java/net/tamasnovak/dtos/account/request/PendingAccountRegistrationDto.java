package net.tamasnovak.dtos.account.request;

public record PendingAccountRegistrationDto(
  String firstName,
  String lastName,
  String email
) {}
