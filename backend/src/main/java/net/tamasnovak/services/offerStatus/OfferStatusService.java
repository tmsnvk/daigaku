package net.tamasnovak.services.offerStatus;

import net.tamasnovak.entities.application.OfferStatus;
import net.tamasnovak.dtos.status.StatusOptionView;

import java.util.List;

public interface OfferStatusService {
  List<StatusOptionView> getDropdownOptions();
  OfferStatus findByUuid(String uuid);
  OfferStatus findByUuidOrReturnNull(String uuid);
}
