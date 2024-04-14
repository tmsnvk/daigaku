package net.tamasnovak.services.offerStatus;

import net.tamasnovak.dtos.offerStatus.response.OfferStatusOptionDto;
import net.tamasnovak.entities.application.OfferStatus;
import org.springframework.stereotype.Component;

@Component
public final class OfferStatusMapper {
  public OfferStatusOptionDto toOfferStatusFormDto(OfferStatus offerStatus) {
    return new OfferStatusOptionDto(
      offerStatus.getUuid(),
      offerStatus.getName()
    );
  }
}
