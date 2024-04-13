package net.tamasnovak.services.finalDestinationStatus;

import net.tamasnovak.dtos.finalDestinationStatus.FinalDestinationStatusFormDto;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.repositories.finalDestinationStatus.FinalDestinationStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FinalDestinationServiceImpl implements FinalDestinationStatusService{
  private final FinalDestinationStatusRepository finalDestinationStatusRepository;
  private final FinalDestinationStatusMapper finalDestinationStatusMapper;

  @Autowired
  public FinalDestinationServiceImpl(FinalDestinationStatusRepository finalDestinationStatusRepository, FinalDestinationStatusMapper finalDestinationStatusMapper) {
    this.finalDestinationStatusRepository = finalDestinationStatusRepository;
    this.finalDestinationStatusMapper = finalDestinationStatusMapper;
  }

  @Override
  @Transactional(readOnly = true)
  public FinalDestinationStatus findByName(String statusName) {
    return finalDestinationStatusRepository.findByName(statusName);
  }

  @Override
  @Transactional(readOnly = true)
  public List<FinalDestinationStatusFormDto> findAll() {
    List<FinalDestinationStatus> finalDestinationStatuses = finalDestinationStatusRepository.findAll();

    return finalDestinationStatuses.stream()
      .map(finalDestinationStatusMapper::toFinalDestinationStatusFormDto)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public FinalDestinationStatus findByUuid(UUID uuid) {
    return finalDestinationStatusRepository.findByUuid(uuid);
  }
}
