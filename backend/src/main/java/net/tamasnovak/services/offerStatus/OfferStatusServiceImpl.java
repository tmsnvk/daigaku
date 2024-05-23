package net.tamasnovak.services.offerStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.OfferStatus;
import net.tamasnovak.repositories.offerStatus.OfferStatusRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class OfferStatusServiceImpl implements OfferStatusService {
  private final OfferStatusRepository offerStatusRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public OfferStatusServiceImpl(OfferStatusRepository offerStatusRepository, GlobalServiceConstants globalServiceConstants) {
    this.offerStatusRepository = offerStatusRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<StatusSelectOptionView> getAllSelectOptionViews() {
    return offerStatusRepository.findAllByOrderByNameAsc();
  }

  @Override
  @Transactional(readOnly = true)
  public OfferStatus getStatusByUuid(String uuid) {
    return offerStatusRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public OfferStatus getStatusByUuidOnApplicationUpdate(OfferStatus currentStatus, String requestBodyStatusUuid) {
    if (currentStatus != null) {
      if (Objects.equals(currentStatus.getUuid().toString(), requestBodyStatusUuid)) {
        return currentStatus;
      }
    }

    if (Objects.equals(requestBodyStatusUuid, "")) {
      return null;
    }

    return getStatusByUuid(requestBodyStatusUuid);
  }
}
