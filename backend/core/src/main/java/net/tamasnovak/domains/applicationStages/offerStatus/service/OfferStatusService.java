package net.tamasnovak.domains.applicationStages.offerStatus.service;

import net.tamasnovak.domains.applicationStages.offerStatus.models.entity.OfferStatus;
import net.tamasnovak.domains.applicationStages.shared.models.dtoResponses.StageSelectOptionDto;

import java.util.List;

public interface OfferStatusService {
  OfferStatus getByUuid(String uuid);

  OfferStatus getByName(String statusName);

  List<StageSelectOptionDto> getAllSelectOptions();
}
