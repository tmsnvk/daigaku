package net.tamasnovak.dtos.account.access;

public record AccountRegistrationDto(
  String firstName,
  String lastName,
  String email
) {}
