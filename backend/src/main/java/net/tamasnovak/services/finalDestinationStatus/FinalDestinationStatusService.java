package net.tamasnovak.services.finalDestinationStatus;

import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.projections.status.GenericStatusView;

import java.util.List;

public interface FinalDestinationStatusService {
  List<GenericStatusView> findAll();
  FinalDestinationStatus findByUuid(String uuid);
}
