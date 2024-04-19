package net.tamasnovak.services.finalDestinationStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.finalDestinationStatus.response.FinalDestinationStatusOptionDto;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.repositories.finalDestinationStatus.FinalDestinationStatusRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.utilities.ValidatorUtilities;
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
  private final ValidatorUtilities validatorUtilities;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public FinalDestinationServiceImpl(FinalDestinationStatusRepository finalDestinationStatusRepository, FinalDestinationStatusMapper finalDestinationStatusMapper, ValidatorUtilities validatorUtilities, GlobalServiceConstants globalServiceConstants) {
    this.finalDestinationStatusRepository = finalDestinationStatusRepository;
    this.finalDestinationStatusMapper = finalDestinationStatusMapper;
    this.validatorUtilities = validatorUtilities;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public FinalDestinationStatus findByName(String statusName) {
    return finalDestinationStatusRepository.findByName(statusName);
  }

  @Override
  @Transactional(readOnly = true)
  public List<FinalDestinationStatusOptionDto> findAll() {
    List<FinalDestinationStatus> finalDestinationStatuses = finalDestinationStatusRepository.findAll();

    return finalDestinationStatuses.stream()
      .map(finalDestinationStatusMapper::toFinalDestinationStatusFormDto)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public FinalDestinationStatus findByUuid(String uuid) {
    UUID validUuid = validatorUtilities.validateIfStringIsUuid(uuid, globalServiceConstants.NO_RECORD_FOUND);

    return finalDestinationStatusRepository.findByUuid(validUuid)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
