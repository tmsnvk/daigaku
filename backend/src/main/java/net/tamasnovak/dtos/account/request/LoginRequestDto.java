package net.tamasnovak.dtos.account.request;

public record LoginRequestDto(
  String email,
  String password
) {}
