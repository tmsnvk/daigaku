package net.tamasnovak.artifact.applicationstages.finalDestinationStatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstages.finalDestinationStatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstages.finalDestinationStatus.persistence.FinalDestinationStatusRepository;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Qualifier(value = "FinalDestinationStatusService")
public class FinalDestinationServiceImpl implements FinalDestinationStatusService {
  private final FinalDestinationStatusRepository finalDestinationStatusRepository;
  private final GlobalServiceMessages globalServiceMessages;

  @Autowired
  public FinalDestinationServiceImpl(
    FinalDestinationStatusRepository finalDestinationStatusRepository,
    GlobalServiceMessages globalServiceMessages) {
    this.finalDestinationStatusRepository = finalDestinationStatusRepository;
    this.globalServiceMessages = globalServiceMessages;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "FinalDestinationStatusByUuid", key = "{ #uuid }")
  public FinalDestinationStatus findByUuid(final UUID uuid) {
    return finalDestinationStatusRepository.findByUuid(uuid)
                                           .orElseThrow(() -> new EntityNotFoundException(globalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "FinalDestinationStatusByName", key = "{ #statusName }")
  public FinalDestinationStatus findByName(final String statusName) {
    return finalDestinationStatusRepository.findByName(statusName)
                                           .orElseThrow(() -> new EntityNotFoundException(globalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "FinalDestinationStatusDropdownOption")
  public List<StatusDropdownOption> findAllSortedByName() {
    return finalDestinationStatusRepository.findAllByOrderByNameAsc();
  }
}
