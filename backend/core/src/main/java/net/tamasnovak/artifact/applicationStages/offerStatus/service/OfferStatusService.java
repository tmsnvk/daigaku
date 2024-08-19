package net.tamasnovak.artifact.applicationStages.offerStatus.service;

import net.tamasnovak.artifact.applicationStages.offerStatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationStages.shared.dto.StatusDropdownOption;

import java.util.List;
import java.util.UUID;

public interface OfferStatusService {
  OfferStatus findByUuid(UUID uuid);

  OfferStatus findByName(String statusName);

  List<StatusDropdownOption> findAllSortedByName();
}
