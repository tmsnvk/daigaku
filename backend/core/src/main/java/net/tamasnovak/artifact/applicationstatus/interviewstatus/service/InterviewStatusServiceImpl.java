/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.interviewstatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.applicationstatus.interviewstatus.entity.InterviewStatus;
import net.tamasnovak.artifact.applicationstatus.interviewstatus.persistence.InterviewStatusRepository;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class managing {@link InterviewStatus} entity-related operations, implementing {@link InterviewStatusService}.
 *
 * @since 0.0.1
 */
@Service
@Qualifier(value = "InterviewStatusService")
public class InterviewStatusServiceImpl implements InterviewStatusService {
  private final InterviewStatusRepository interviewStatusRepository;

  @Autowired
  public InterviewStatusServiceImpl(InterviewStatusRepository interviewStatusRepository) {
    this.interviewStatusRepository = interviewStatusRepository;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InterviewStatusByUuid", key = "{ #statusUuid }")
  public InterviewStatus findStatusByUuid(final UUID statusUuid) {
    return interviewStatusRepository.findInterviewStatusByUuid(statusUuid)
                                    .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InterviewStatusByName", key = "{ #statusName }")
  public InterviewStatus findStatusByName(final String statusName) {
    return interviewStatusRepository.findInterviewStatusByName(statusName)
                                    .orElseThrow(() -> new EntityNotFoundException(GlobalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InterviewStatusDropdownOption")
  public List<StatusSelectOption> findAllSortedByName() {
    return interviewStatusRepository.findSelectOptionsByOrderByNameAsc();
  }
}
