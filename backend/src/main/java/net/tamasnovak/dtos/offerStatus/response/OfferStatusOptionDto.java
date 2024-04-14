package net.tamasnovak.dtos.offerStatus.response;

import java.util.UUID;

public record OfferStatusOptionDto(
  UUID uuid,
  String name
) {}
