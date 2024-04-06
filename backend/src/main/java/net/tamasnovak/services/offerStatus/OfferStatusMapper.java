package net.tamasnovak.services.offerStatus;

import net.tamasnovak.dtos.offerStatus.OfferStatusFormDto;
import net.tamasnovak.entities.application.OfferStatus;
import org.springframework.stereotype.Component;

@Component
public final class OfferStatusMapper {
  public OfferStatusFormDto toOfferStatusFormDto(OfferStatus offerStatus) {
    return new OfferStatusFormDto(
      offerStatus.getUuid(),
      offerStatus.getName()
    );
  }
}
