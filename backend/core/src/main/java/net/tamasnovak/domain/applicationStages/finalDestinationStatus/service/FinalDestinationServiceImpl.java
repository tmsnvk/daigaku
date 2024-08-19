package net.tamasnovak.domain.applicationStages.finalDestinationStatus.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domain.applicationStages.finalDestinationStatus.entity.FinalDestinationStatus;
import net.tamasnovak.domain.applicationStages.finalDestinationStatus.persistence.FinalDestinationStatusRepository;
import net.tamasnovak.domain.applicationStages.shared.dto.StatusSelectOption;
import net.tamasnovak.domain.shared.constants.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Qualifier(value = "FinalDestinationStatusService")
public class FinalDestinationServiceImpl implements FinalDestinationStatusService {
  private final FinalDestinationStatusRepository finalDestinationStatusRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public FinalDestinationServiceImpl(FinalDestinationStatusRepository finalDestinationStatusRepository, GlobalServiceConstants globalServiceConstants) {
    this.finalDestinationStatusRepository = finalDestinationStatusRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "FinalDestinationStatusByUuid", key = "{ #uuid }")
  public FinalDestinationStatus getByUuid(final UUID uuid) {
    return finalDestinationStatusRepository.findByUuid(uuid)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "FinalDestinationStatusByName", key = "{ #statusName }")
  public FinalDestinationStatus getByName(final String statusName) {
    return finalDestinationStatusRepository.findByName(statusName)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "FinalDestinationStatusSelectOptionViews")
  public List<StatusSelectOption> getAllSelectOptions() {
    return finalDestinationStatusRepository.findAllByOrderByNameAsc();
  }
}
