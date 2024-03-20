package net.tamasnovak.dtos.account.access;

public record PendingAccountRegistrationDto(
  String firstName,
  String lastName,
  String email
) {}
