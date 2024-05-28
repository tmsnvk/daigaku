package net.tamasnovak.services.status.offerStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.status.OfferStatus;

import java.util.List;

public interface OfferStatusService {
  OfferStatus getByUuid(String uuid);

  OfferStatus getByName(String statusName);

  List<StatusSelectOptionView> getAllSelectOptionViews();
}
