/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.offerstatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.applicationstatus.offerstatus.entity.OfferStatus;
import net.tamasnovak.artifact.applicationstatus.offerstatus.persistence.OfferStatusRepository;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class managing {@link OfferStatus} entity-related operations, implementing {@link OfferStatusService}.
 */
@Service
@Qualifier(value = "OfferStatusService")
public class OfferStatusServiceImpl implements OfferStatusService {
  private final OfferStatusRepository offerStatusRepository;

  @Autowired
  public OfferStatusServiceImpl(OfferStatusRepository offerStatusRepository) {
    this.offerStatusRepository = offerStatusRepository;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "OfferStatusByUuid", key = "{ #statusUuid }")
  public OfferStatus findStatusByUuid(final UUID statusUuid) {
    return offerStatusRepository.findOfferStatusByUuid(statusUuid)
                                .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "OfferStatusByName", key = "{ #statusName }")
  public OfferStatus findStatusByName(final String statusName) {
    return offerStatusRepository.findOfferStatusByName(statusName)
                                .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "OfferStatusDropdownOption")
  public List<StatusSelectOption> findAllSortedByName() {
    return offerStatusRepository.findSelectOptionsByOrderByNameAsc();
  }
}
