package net.tamasnovak.services.finalDestinationStatus;

import net.tamasnovak.dtos.finalDestinationStatus.response.FinalDestinationStatusOptionDto;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import org.springframework.stereotype.Component;

@Component
public final class FinalDestinationStatusMapper {
  public FinalDestinationStatusOptionDto toFinalDestinationStatusFormDto(FinalDestinationStatus finalDestinationStatus) {
    return new FinalDestinationStatusOptionDto(
      finalDestinationStatus.getUuid(),
      finalDestinationStatus.getName()
    );
  }
}
