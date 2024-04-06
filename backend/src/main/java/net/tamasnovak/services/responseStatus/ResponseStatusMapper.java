package net.tamasnovak.services.responseStatus;

import net.tamasnovak.dtos.responseStatus.ResponseStatusFormDto;
import net.tamasnovak.entities.application.ResponseStatus;
import org.springframework.stereotype.Component;

@Component
public final class ResponseStatusMapper {
  public ResponseStatusFormDto toResponseStatusFormDto(ResponseStatus responseStatus) {
    return new ResponseStatusFormDto(
      responseStatus.getUuid(),
      responseStatus.getName()
    );
  }
}
