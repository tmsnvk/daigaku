package net.tamasnovak.services.finalDestinationStatus;

import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.dtos.status.StatusOptionView;

import java.util.List;

public interface FinalDestinationStatusService {
  List<StatusOptionView> getDropdownOptions();
  FinalDestinationStatus findByUuid(String uuid);
  FinalDestinationStatus findByUuidOrReturnNull(String uuid);
}
