package net.tamasnovak.services.responseStatus;

import net.tamasnovak.dtos.responseStatus.ResponseStatusFormDto;
import net.tamasnovak.entities.application.ResponseStatus;

import java.util.List;
import java.util.UUID;

public interface ResponseStatusService {
  List<ResponseStatusFormDto> findAll();
  ResponseStatus findByUuid(UUID uuid);
}
