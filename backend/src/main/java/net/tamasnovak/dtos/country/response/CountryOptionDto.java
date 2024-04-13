package net.tamasnovak.dtos.country.response;

import java.util.UUID;

public record CountryOptionDto(
  UUID uuid,
  String name
) {}
