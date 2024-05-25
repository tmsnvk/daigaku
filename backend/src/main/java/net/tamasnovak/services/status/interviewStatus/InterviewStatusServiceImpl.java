package net.tamasnovak.services.status.interviewStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.InterviewStatus;
import net.tamasnovak.repositories.interviewStatus.InterviewStatusRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
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
  @Cacheable(value = "InterviewStatus", key = "#uuid")
  public InterviewStatus getStatusByUuid(String uuid) {
    return interviewStatusRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  public InterviewStatus getStatusByName(String statusName) {
    return interviewStatusRepository.findByName(statusName)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "InterviewStatusSelectOptionView")
  public List<StatusSelectOptionView> getAllSelectOptionViews() {
    return interviewStatusRepository.findAllByOrderByNameAsc();
  }
}
