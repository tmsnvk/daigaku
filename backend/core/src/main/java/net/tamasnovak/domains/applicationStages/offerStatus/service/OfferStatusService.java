package net.tamasnovak.domains.applicationStages.offerStatus.service;

import net.tamasnovak.domains.applicationStages.offerStatus.entity.OfferStatus;
import net.tamasnovak.domains.applicationStages.shared.dto.StatusSelectOption;

import java.util.List;

public interface OfferStatusService {
  OfferStatus getByUuid(String uuid);

  OfferStatus getByName(String statusName);

  List<StatusSelectOption> getAllSelectOptions();
}
