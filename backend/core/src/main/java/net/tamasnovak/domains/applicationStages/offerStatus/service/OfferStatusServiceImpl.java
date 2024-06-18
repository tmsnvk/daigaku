package net.tamasnovak.domains.applicationStages.offerStatus.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.applicationStages.offerStatus.models.entity.OfferStatus;
import net.tamasnovak.domains.applicationStages.offerStatus.persistence.OfferStatusRepository;
import net.tamasnovak.domains.applicationStages.shared.models.dtoResponses.StageSelectOptionDto;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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
  @Cacheable(value = "OfferStatusByUuid", key = "{ #uuid }")
  public OfferStatus getByUuid(String uuid) {
    return offerStatusRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "OfferStatusByName", key = "{ #statusName }")
  public OfferStatus getByName(String statusName) {
    return offerStatusRepository.findByName(statusName)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "OfferStatusSelectOptionViews")
  public List<StageSelectOptionDto> getAllSelectOptions() {
    return offerStatusRepository.findAllByOrderByNameAsc();
  }
}
