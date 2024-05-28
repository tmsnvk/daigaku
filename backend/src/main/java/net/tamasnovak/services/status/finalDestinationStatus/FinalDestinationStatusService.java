package net.tamasnovak.services.status.finalDestinationStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.status.FinalDestinationStatus;

import java.util.List;

public interface FinalDestinationStatusService {
  FinalDestinationStatus getByUuid(String uuid);

  FinalDestinationStatus getByName(String statusName);

  List<StatusSelectOptionView> getAllSelectOptionViews();
}
