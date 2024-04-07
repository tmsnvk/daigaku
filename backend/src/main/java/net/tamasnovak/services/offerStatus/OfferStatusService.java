package net.tamasnovak.services.offerStatus;

import net.tamasnovak.dtos.offerStatus.OfferStatusFormDto;
import net.tamasnovak.entities.application.OfferStatus;

import java.util.List;
import java.util.UUID;

public interface OfferStatusService {
  List<OfferStatusFormDto> findAll();
  OfferStatus findByUuid(UUID uuid);
}
