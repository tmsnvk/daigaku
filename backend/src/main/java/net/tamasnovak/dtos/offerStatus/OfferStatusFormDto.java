package net.tamasnovak.dtos.offerStatus;

import java.util.UUID;

public record OfferStatusFormDto(
  UUID uuid,
  String name
) {}
