package net.tamasnovak.domain.applicationStages.offerStatus.service;

import net.tamasnovak.domain.applicationStages.offerStatus.entity.OfferStatus;
import net.tamasnovak.domain.applicationStages.shared.dto.StatusSelectOption;

import java.util.List;
import java.util.UUID;

public interface OfferStatusService {
  OfferStatus getByUuid(UUID uuid);

  OfferStatus getByName(String statusName);

  List<StatusSelectOption> getAllSelectOptions();
}
