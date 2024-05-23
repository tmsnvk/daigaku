package net.tamasnovak.services.offerStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.OfferStatus;

import java.util.List;

public interface OfferStatusService {
  List<StatusSelectOptionView> getAllSelectOptionViews();
  OfferStatus getStatusByUuid(String uuid);
  OfferStatus getStatusByUuidOnApplicationUpdate(OfferStatus currentStatus, String requestBodyStatusUuid);
}
