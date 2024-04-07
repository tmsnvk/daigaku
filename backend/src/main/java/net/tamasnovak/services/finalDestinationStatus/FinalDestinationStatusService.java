package net.tamasnovak.services.finalDestinationStatus;

import net.tamasnovak.dtos.finalDestinationStatus.FinalDestinationStatusFormDto;
import net.tamasnovak.entities.application.FinalDestinationStatus;

import java.util.List;
import java.util.UUID;

public interface FinalDestinationStatusService {
  List<FinalDestinationStatusFormDto> findAll();
  FinalDestinationStatus findByUuid(UUID uuid);
}
