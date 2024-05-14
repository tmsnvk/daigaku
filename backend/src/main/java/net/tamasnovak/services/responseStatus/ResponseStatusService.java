package net.tamasnovak.services.responseStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.ResponseStatus;

import java.util.List;

public interface ResponseStatusService {
  List<StatusSelectOptionView> getSelectOptions();
  ResponseStatus getStatusByUuid(String uuid);
  ResponseStatus getStatusByUuidOnApplicationUpdate(ResponseStatus currentStatus, String requestBodyStatusUuid);
}
