package net.tamasnovak.exceptions;

public record ErrorResponse(
  int status,
  String message,
  long timestamp
) {}
