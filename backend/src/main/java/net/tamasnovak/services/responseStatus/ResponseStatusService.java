package net.tamasnovak.services.responseStatus;

import net.tamasnovak.dtos.responseStatus.response.ResponseStatusOptionDto;
import net.tamasnovak.entities.application.ResponseStatus;

import java.util.List;
import java.util.UUID;

public interface ResponseStatusService {
  ResponseStatus findByName(String statusName);
  List<ResponseStatusOptionDto> findAll();
  ResponseStatus findByUuid(UUID uuid);
}
