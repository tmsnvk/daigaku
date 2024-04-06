package net.tamasnovak.services.finalDestinationStatus;

import net.tamasnovak.dtos.finalDestinationStatus.FinalDestinationStatusFormDto;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import org.springframework.stereotype.Component;

@Component
public final class FinalDestinationStatusMapper {
  public FinalDestinationStatusFormDto toFinalDestinationStatusFormDto(FinalDestinationStatus finalDestinationStatus) {
    return new FinalDestinationStatusFormDto(
      finalDestinationStatus.getUuid(),
      finalDestinationStatus.getName()
    );
  }
}
