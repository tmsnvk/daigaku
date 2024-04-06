package net.tamasnovak.services.responseStatus;

import net.tamasnovak.dtos.responseStatus.ResponseStatusFormDto;

import java.util.List;

public interface ResponseStatusService {
  List<ResponseStatusFormDto> findAll();
}
