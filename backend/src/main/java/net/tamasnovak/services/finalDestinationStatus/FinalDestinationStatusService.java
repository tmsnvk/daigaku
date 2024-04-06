package net.tamasnovak.services.finalDestinationStatus;

import net.tamasnovak.dtos.finalDestinationStatus.FinalDestinationStatusFormDto;

import java.util.List;

public interface FinalDestinationStatusService {
  List<FinalDestinationStatusFormDto> findAll();
}
