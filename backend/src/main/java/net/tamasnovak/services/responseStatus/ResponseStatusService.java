package net.tamasnovak.services.responseStatus;

import net.tamasnovak.entities.application.ResponseStatus;
import net.tamasnovak.projections.status.StatusOptionView;

import java.util.List;

public interface ResponseStatusService {
  List<StatusOptionView> getDropdownOptions();
  ResponseStatus findByUuid(String uuid);
}
