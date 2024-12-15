/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.responsestatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.applicationstatus.responsestatus.entity.ResponseStatus;
import net.tamasnovak.artifact.applicationstatus.responsestatus.persistence.ResponseStatusRepository;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class managing {@link ResponseStatus} entity-related operations, implementing {@link ResponseStatusService}.
 *
 * @since 0.0.1
 */
@Service
@Qualifier(value = "ResponseStatusService")
public class ResponseStatusServiceImpl implements ResponseStatusService {
  private final ResponseStatusRepository responseStatusRepository;

  @Autowired
  public ResponseStatusServiceImpl(ResponseStatusRepository responseStatusRepository) {
    this.responseStatusRepository = responseStatusRepository;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ResponseStatusByUuid", key = "{ #statusUuid }")
  public ResponseStatus findStatusByUuid(final UUID statusUuid) {
    return responseStatusRepository.findResponseStatusByUuid(statusUuid)
                                   .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ResponseStatusByName", key = "{ #statusName }")
  public ResponseStatus findStatusByName(final String statusName) {
    return responseStatusRepository.findResponseStatusByName(statusName)
                                   .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ResponseStatusDropdownOption")
  public List<StatusSelectOption> findAllSortedByName() {
    return responseStatusRepository.findSelectOptionsByOrderByNameAsc();
  }
}
