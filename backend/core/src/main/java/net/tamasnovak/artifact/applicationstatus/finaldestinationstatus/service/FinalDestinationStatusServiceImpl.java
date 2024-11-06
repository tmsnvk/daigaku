package net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.persistence.FinalDestinationStatusRepository;
import net.tamasnovak.artifact.applicationstatus.shared.dto.StatusDropdownOption;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Qualifier(value = "FinalDestinationStatusService")
public class FinalDestinationStatusServiceImpl implements FinalDestinationStatusService {
  private final FinalDestinationStatusRepository finalDestinationStatusRepository;
  private final GlobalServiceMessages globalServiceMessages;

  @Autowired
  public FinalDestinationStatusServiceImpl(
    FinalDestinationStatusRepository finalDestinationStatusRepository,
    GlobalServiceMessages globalServiceMessages) {
    this.finalDestinationStatusRepository = finalDestinationStatusRepository;
    this.globalServiceMessages = globalServiceMessages;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "FinalDestinationStatusByUuid", key = "{ #uuid }")
  public FinalDestinationStatus findByUuid(final UUID uuid) {
    return finalDestinationStatusRepository.findFinalDestinationStatusByUuid(uuid)
                                           .orElseThrow(() -> new EntityNotFoundException(globalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "FinalDestinationStatusByName", key = "{ #statusName }")
  public FinalDestinationStatus findByName(final String statusName) {
    return finalDestinationStatusRepository.findFinalDestinationStatusByName(statusName)
                                           .orElseThrow(() -> new EntityNotFoundException(globalServiceMessages.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "FinalDestinationStatusDropdownOption")
  public List<StatusDropdownOption> findAllSortedByName() {
    return finalDestinationStatusRepository.findSelectOptionsByOrderByNameAsc();
  }
}
