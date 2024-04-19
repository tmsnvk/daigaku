package net.tamasnovak.services.interviewStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.interviewStatus.response.InterviewStatusOptionDto;
import net.tamasnovak.entities.application.InterviewStatus;
import net.tamasnovak.repositories.interviewStatus.InterviewStatusRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.utilities.ValidatorUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InterviewStatusServiceImpl implements InterviewStatusService {
  private final InterviewStatusRepository interviewStatusRepository;
  private final InterviewStatusMapper interviewStatusMapper;
  private final ValidatorUtilities validatorUtilities;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public InterviewStatusServiceImpl(InterviewStatusRepository interviewStatusRepository, InterviewStatusMapper interviewStatusMapper, ValidatorUtilities validatorUtilities, GlobalServiceConstants globalServiceConstants) {
    this.interviewStatusRepository = interviewStatusRepository;
    this.interviewStatusMapper = interviewStatusMapper;
    this.validatorUtilities = validatorUtilities;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<InterviewStatusOptionDto> findAll() {
    List<InterviewStatus> interviewStatuses = interviewStatusRepository.findAll();

    return interviewStatuses.stream()
      .map(interviewStatusMapper::toInterviewStatusFromDto)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public InterviewStatus findByUuid(String uuid) {
    UUID validUuid = validatorUtilities.validateIfStringIsUuid(uuid, globalServiceConstants.NO_RECORD_FOUND);

    return interviewStatusRepository.findByUuid(validUuid)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
