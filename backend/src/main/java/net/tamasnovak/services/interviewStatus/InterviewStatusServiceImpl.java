package net.tamasnovak.services.interviewStatus;

import net.tamasnovak.dtos.interviewStatus.InterviewStatusFormDto;
import net.tamasnovak.entities.application.InterviewStatus;
import net.tamasnovak.repositories.interviewStatus.InterviewStatusRepository;
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

  @Autowired
  public InterviewStatusServiceImpl(InterviewStatusRepository interviewStatusRepository, InterviewStatusMapper interviewStatusMapper) {
    this.interviewStatusRepository = interviewStatusRepository;
    this.interviewStatusMapper = interviewStatusMapper;
  }

  @Override
  @Transactional(readOnly = true)
  public List<InterviewStatusFormDto> findAll() {
    List<InterviewStatus> interviewStatuses = interviewStatusRepository.findAll();

    return interviewStatuses.stream()
      .map(interviewStatusMapper::toInterviewStatusFromDto)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public InterviewStatus findByUuid(UUID uuid) {
    return interviewStatusRepository.findByUuid(uuid);
  }
}
