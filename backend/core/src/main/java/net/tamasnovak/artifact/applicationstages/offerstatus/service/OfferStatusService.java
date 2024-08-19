package net.tamasnovak.artifact.applicationstages.offerstatus.service;

import net.tamasnovak.artifact.applicationstages.offerstatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusSelectOption;

import java.util.List;
import java.util.UUID;

public interface OfferStatusService {
  OfferStatus getByUuid(UUID uuid);

  OfferStatus getByName(String statusName);

  List<StatusSelectOption> getAllSelectOptions();
}
