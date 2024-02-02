package net.tamasnovak.dtos.account.access;

public record AccountLoginDto(
  String email,
  String password
) {}
