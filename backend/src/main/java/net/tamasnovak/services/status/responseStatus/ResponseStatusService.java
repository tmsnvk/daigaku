package net.tamasnovak.services.status.responseStatus;

import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.status.ResponseStatus;

import java.util.List;

public interface ResponseStatusService {
  ResponseStatus getByUuid(String uuid);

  ResponseStatus getByName(String statusName);

  List<StatusSelectOptionView> getAllSelectOptionViews();
}
