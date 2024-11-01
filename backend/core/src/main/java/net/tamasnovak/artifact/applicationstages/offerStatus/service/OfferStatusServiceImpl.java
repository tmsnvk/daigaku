package net.tamasnovak.artifact.applicationstages.offerStatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstages.offerStatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationstages.offerStatus.persistence.OfferStatusRepository;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;
import net.tamasnovak.artifact.common.constants.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
  public OfferStatus findByUuid(final UUID uuid) {
    return offerStatusRepository.findByUuid(uuid)
                                .orElseThrow(() -> new EntityNotFoundException(globalConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "OfferStatusByName", key = "{ #statusName }")
  public OfferStatus findByName(final String statusName) {
    return offerStatusRepository.findByName(statusName)
                                .orElseThrow(() -> new EntityNotFoundException(globalConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "OfferStatusDropdownOption")
  public List<StatusDropdownOption> findAllSortedByName() {
    return offerStatusRepository.findAllByOrderByNameAsc();
  }
}
