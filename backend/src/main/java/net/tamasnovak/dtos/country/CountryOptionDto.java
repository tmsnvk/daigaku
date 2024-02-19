package net.tamasnovak.dtos.country;

import java.util.UUID;

public record CountryOptionDto(
  UUID uuid,
  String name
) {}
