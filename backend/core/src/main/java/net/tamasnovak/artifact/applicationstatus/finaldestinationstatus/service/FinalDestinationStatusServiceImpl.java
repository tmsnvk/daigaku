/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.persistence.FinalDestinationStatusRepository;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class managing {@link FinalDestinationStatus} entity-related operations, implementing {@link FinalDestinationStatusService}.
 *
 * @since 0.0.1
 */
@Service
@Qualifier(value = "FinalDestinationStatusService")
public class FinalDestinationStatusServiceImpl implements FinalDestinationStatusService {
  private final FinalDestinationStatusRepository finalDestinationStatusRepository;

  @Autowired
  public FinalDestinationStatusServiceImpl(
    FinalDestinationStatusRepository finalDestinationStatusRepository) {
    this.finalDestinationStatusRepository = finalDestinationStatusRepository;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "FinalDestinationStatusByUuid", key = "{ #statusUuid }")
  public FinalDestinationStatus findStatusByUuid(final UUID statusUuid) {
    return finalDestinationStatusRepository.findFinalDestinationStatusByUuid(statusUuid)
                                           .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "FinalDestinationStatusByName", key = "{ #statusName }")
  public FinalDestinationStatus findStatusByName(final String statusName) {
    return finalDestinationStatusRepository.findFinalDestinationStatusByName(statusName)
                                           .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "FinalDestinationStatusDropdownOption")
  public List<StatusSelectOption> findSelectOptionsSortedByName() {
    return finalDestinationStatusRepository.findSelectOptionsByOrderByNameAsc();
  }
}
