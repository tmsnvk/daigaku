package net.tamasnovak.services.responseStatus;

import net.tamasnovak.dtos.responseStatus.response.ResponseStatusOptionDto;
import net.tamasnovak.entities.application.ResponseStatus;

import java.util.List;

public interface ResponseStatusService {
  ResponseStatus findByName(String statusName);
  List<ResponseStatusOptionDto> findAll();
  ResponseStatus findByUuid(String uuid);
}
