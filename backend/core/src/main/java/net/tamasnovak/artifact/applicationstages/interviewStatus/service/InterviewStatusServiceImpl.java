package net.tamasnovak.artifact.applicationstages.interviewStatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstages.interviewStatus.entity.InterviewStatus;
import net.tamasnovak.artifact.applicationstages.interviewStatus.persistence.InterviewStatusRepository;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Qualifier(value = "InterviewStatusService")
public class InterviewStatusServiceImpl implements InterviewStatusService {
  private final InterviewStatusRepository interviewStatusRepository;
  private final GlobalServiceMessages globalServiceMessages;

  @Autowired
  public InterviewStatusServiceImpl(InterviewStatusRepository interviewStatusRepository, GlobalServiceMessages globalServiceMessages) {
    this.interviewStatusRepository = interviewStatusRepository;
    this.globalServiceMessages = globalServiceMessages;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InterviewStatusByUuid", key = "{ #uuid }")
  public InterviewStatus findByUuid(final UUID uuid) {
    return interviewStatusRepository.findByUuid(uuid)
                                    .orElseThrow(() -> new EntityNotFoundException(globalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InterviewStatusByName", key = "{ #statusName }")
  public InterviewStatus findByName(final String statusName) {
    return interviewStatusRepository.findByName(statusName)
                                    .orElseThrow(() -> new EntityNotFoundException(globalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InterviewStatusDropdownOption")
  public List<StatusDropdownOption> findAllSortedByName() {
    return interviewStatusRepository.findAllByOrderByNameAsc();
  }
}
