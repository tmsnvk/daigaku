package net.tamasnovak.services.offerStatus;

import net.tamasnovak.dtos.offerStatus.response.OfferStatusOptionDto;
import net.tamasnovak.entities.application.OfferStatus;

import java.util.List;

public interface OfferStatusService {
  List<OfferStatusOptionDto> findAll();
  OfferStatus findByUuid(String uuid);
}
