package net.tamasnovak.artifact.applicationstages.offerStatus.service;

import net.tamasnovak.artifact.applicationstages.offerStatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;

import java.util.List;
import java.util.UUID;

public interface OfferStatusService {
  OfferStatus findByUuid(UUID uuid);

  OfferStatus findByName(String statusName);

  List<StatusDropdownOption> findAllSortedByName();
}
