package net.tamasnovak.services.responseStatus;

import net.tamasnovak.dtos.responseStatus.response.ResponseStatusOptionDto;
import net.tamasnovak.entities.application.ResponseStatus;
import org.springframework.stereotype.Component;

@Component
public final class ResponseStatusMapper {
  public ResponseStatusOptionDto toResponseStatusFormDto(ResponseStatus responseStatus) {
    return new ResponseStatusOptionDto(
      responseStatus.getUuid(),
      responseStatus.getName()
    );
  }
}
