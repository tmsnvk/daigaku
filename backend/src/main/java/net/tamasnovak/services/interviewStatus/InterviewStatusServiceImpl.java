package net.tamasnovak.services.interviewStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.InterviewStatus;
import net.tamasnovak.repositories.interviewStatus.InterviewStatusRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
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
  public List<StatusSelectOptionView> getSelectOptions() {
    return interviewStatusRepository.findAllByOrderByNameAsc();
  }

  @Override
  @Transactional(readOnly = true)
  public InterviewStatus getStatusByUuid(String uuid) {
    return interviewStatusRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public InterviewStatus getStatusByUuidOnApplicationUpdate(InterviewStatus currentStatus, String requestBodyStatusUuid) {
    if (currentStatus != null) {
      if (Objects.equals(currentStatus.getUuid().toString(), requestBodyStatusUuid)) {
        return currentStatus;
      }
    }

    if (Objects.equals(requestBodyStatusUuid, "")) {
      return null;
    }

    return getStatusByUuid(requestBodyStatusUuid);
  }
}
