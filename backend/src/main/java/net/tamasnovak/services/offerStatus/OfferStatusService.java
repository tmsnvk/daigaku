package net.tamasnovak.services.offerStatus;

import net.tamasnovak.dtos.offerStatus.OfferStatusFormDto;

import java.util.List;

public interface OfferStatusService {
  List<OfferStatusFormDto> findAll();
}
