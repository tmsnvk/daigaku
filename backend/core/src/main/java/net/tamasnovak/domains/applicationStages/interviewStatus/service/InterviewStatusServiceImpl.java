package net.tamasnovak.domains.applicationStages.interviewStatus.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.applicationStages.interviewStatus.entity.InterviewStatus;
import net.tamasnovak.domains.applicationStages.interviewStatus.persistence.InterviewStatusRepository;
import net.tamasnovak.domains.applicationStages.shared.dto.StatusSelectOption;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Qualifier(value = "InterviewStatusService")
public class InterviewStatusServiceImpl implements InterviewStatusService {
  private final InterviewStatusRepository interviewStatusRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public InterviewStatusServiceImpl(InterviewStatusRepository interviewStatusRepository, GlobalServiceConstants globalServiceConstants) {
    this.interviewStatusRepository = interviewStatusRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InterviewStatusByUuid", key = "{ #uuid }")
  public InterviewStatus getByUuid(final String uuid) {
    return interviewStatusRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InterviewStatusByName", key = "{ #statusName }")
  public InterviewStatus getByName(final String statusName) {
    return interviewStatusRepository.findByName(statusName)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InterviewStatusSelectOptionViews")
  public List<StatusSelectOption> getAllSelectOptions() {
    return interviewStatusRepository.findAllByOrderByNameAsc();
  }
}
