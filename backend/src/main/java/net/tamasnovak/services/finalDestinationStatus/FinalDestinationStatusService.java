package net.tamasnovak.services.finalDestinationStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.FinalDestinationStatus;

import java.util.List;

public interface FinalDestinationStatusService {
  List<StatusSelectOptionView> getSelectOptions();
  FinalDestinationStatus findByUuid(String uuid);
  FinalDestinationStatus findByUuidOrReturnNull(String uuid);
}
