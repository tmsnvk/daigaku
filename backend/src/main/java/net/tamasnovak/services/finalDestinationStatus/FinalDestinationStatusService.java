package net.tamasnovak.services.finalDestinationStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.FinalDestinationStatus;

import java.util.List;

public interface FinalDestinationStatusService {
  List<StatusSelectOptionView> getAllSelectOptionViews();
  FinalDestinationStatus getStatusByUuid(String uuid);
  FinalDestinationStatus getStatusByUuidOnApplicationUpdate(FinalDestinationStatus currentStatus, String requestBodyStatusUuid);
}
