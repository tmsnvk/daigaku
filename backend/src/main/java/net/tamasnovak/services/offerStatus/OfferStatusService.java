package net.tamasnovak.services.offerStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.OfferStatus;

import java.util.List;

public interface OfferStatusService {
  List<StatusSelectOptionView> getSelectOptions();
  OfferStatus findByUuid(String uuid);
  OfferStatus findByUuidOrReturnNull(String uuid);
}
