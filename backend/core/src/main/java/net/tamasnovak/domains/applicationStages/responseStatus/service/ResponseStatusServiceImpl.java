package net.tamasnovak.domains.applicationStages.responseStatus.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.applicationStages.responseStatus.entity.ResponseStatus;
import net.tamasnovak.domains.applicationStages.responseStatus.persistence.ResponseStatusRepository;
import net.tamasnovak.domains.applicationStages.shared.dto.StatusSelectOption;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Qualifier(value = "ResponseStatusService")
public class ResponseStatusServiceImpl implements ResponseStatusService {
  private final ResponseStatusRepository responseStatusRepository;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public ResponseStatusServiceImpl(ResponseStatusRepository responseStatusRepository, GlobalServiceConstants globalServiceConstants) {
    this.responseStatusRepository = responseStatusRepository;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ResponseStatusByUuid", key = "{ #uuid }")
  public ResponseStatus getByUuid(final String uuid) {
    return responseStatusRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ResponseStatusByName", key = "{ #statusName }")
  public ResponseStatus getByName(final String statusName) {
    return responseStatusRepository.findByName(statusName)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ResponseStatusSelectOptionViews")
  public List<StatusSelectOption> getAllSelectOptions() {
    return responseStatusRepository.findAllByOrderByNameAsc();
  }
}
