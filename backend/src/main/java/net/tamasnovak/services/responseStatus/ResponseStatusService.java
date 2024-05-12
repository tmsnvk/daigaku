package net.tamasnovak.services.responseStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.ResponseStatus;

import java.util.List;

public interface ResponseStatusService {
  List<StatusSelectOptionView> getSelectOptions();
  ResponseStatus findByUuid(String uuid);
  ResponseStatus findByUuidOrReturnNull(String uuid);
}
