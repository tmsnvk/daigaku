package net.tamasnovak.services.responseStatus;

import net.tamasnovak.entities.application.ResponseStatus;
import net.tamasnovak.projections.status.GenericStatusView;

import java.util.List;

public interface ResponseStatusService {
  List<GenericStatusView> findAll();
  ResponseStatus findByUuid(String uuid);
}
