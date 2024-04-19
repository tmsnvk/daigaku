package net.tamasnovak.services.finalDestinationStatus;

import net.tamasnovak.dtos.finalDestinationStatus.response.FinalDestinationStatusOptionDto;
import net.tamasnovak.entities.application.FinalDestinationStatus;

import java.util.List;

public interface FinalDestinationStatusService {
  FinalDestinationStatus findByName(String statusName);
  List<FinalDestinationStatusOptionDto> findAll();
  FinalDestinationStatus findByUuid(String uuid);
}
