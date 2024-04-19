package net.tamasnovak.services.finalDestinationStatus;

import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.projections.status.StatusOptionView;

import java.util.List;

public interface FinalDestinationStatusService {
  List<StatusOptionView> getDropdownOptions();
  FinalDestinationStatus findByUuid(String uuid);
}
