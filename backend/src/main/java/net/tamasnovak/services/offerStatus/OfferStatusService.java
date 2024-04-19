package net.tamasnovak.services.offerStatus;

import net.tamasnovak.entities.application.OfferStatus;
import net.tamasnovak.projections.status.GenericStatusView;

import java.util.List;

public interface OfferStatusService {
  List<GenericStatusView> findAll();
  OfferStatus findByUuid(String uuid);
}
