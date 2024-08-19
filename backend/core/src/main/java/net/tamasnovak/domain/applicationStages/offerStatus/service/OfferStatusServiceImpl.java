package net.tamasnovak.domain.applicationStages.offerStatus.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domain.applicationStages.offerStatus.entity.OfferStatus;
import net.tamasnovak.domain.applicationStages.offerStatus.persistence.OfferStatusRepository;
import net.tamasnovak.domain.applicationStages.shared.dto.StatusSelectOption;
import net.tamasnovak.domain.shared.constants.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Qualifier(value = "OfferStatusService")
public class OfferStatusServiceImpl implements OfferStatusService {
  private final OfferStatusRepository offerStatusRepository;
  private final GlobalServiceConstants globalConstants;

  @Autowired
  public OfferStatusServiceImpl(OfferStatusRepository offerStatusRepository, GlobalServiceConstants globalConstants) {
    this.offerStatusRepository = offerStatusRepository;
    this.globalConstants = globalConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "OfferStatusByUuid", key = "{ #uuid }")
  public OfferStatus getByUuid(final UUID uuid) {
    return offerStatusRepository.findByUuid(uuid)
      .orElseThrow(() -> new EntityNotFoundException(globalConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "OfferStatusByName", key = "{ #statusName }")
  public OfferStatus getByName(final String statusName) {
    return offerStatusRepository.findByName(statusName)
      .orElseThrow(() -> new EntityNotFoundException(globalConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "OfferStatusSelectOptionViews")
  public List<StatusSelectOption> getAllSelectOptions() {
    return offerStatusRepository.findAllByOrderByNameAsc();
  }
}
