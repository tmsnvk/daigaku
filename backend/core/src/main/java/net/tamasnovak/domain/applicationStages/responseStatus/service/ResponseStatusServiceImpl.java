package net.tamasnovak.domain.applicationStages.responseStatus.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domain.applicationStages.responseStatus.entity.ResponseStatus;
import net.tamasnovak.domain.applicationStages.responseStatus.persistence.ResponseStatusRepository;
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
@Qualifier(value = "ResponseStatusService")
public class ResponseStatusServiceImpl implements ResponseStatusService {
  private final ResponseStatusRepository responseStatusRepository;
  private final GlobalServiceConstants globalConstants;

  @Autowired
  public ResponseStatusServiceImpl(ResponseStatusRepository responseStatusRepository, GlobalServiceConstants globalConstants) {
    this.responseStatusRepository = responseStatusRepository;
    this.globalConstants = globalConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ResponseStatusByUuid", key = "{ #uuid }")
  public ResponseStatus getByUuid(final UUID uuid) {
    return responseStatusRepository.findByUuid(uuid)
      .orElseThrow(() -> new EntityNotFoundException(globalConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ResponseStatusByName", key = "{ #statusName }")
  public ResponseStatus getByName(final String statusName) {
    return responseStatusRepository.findByName(statusName)
      .orElseThrow(() -> new EntityNotFoundException(globalConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ResponseStatusSelectOptionViews")
  public List<StatusSelectOption> getAllSelectOptions() {
    return responseStatusRepository.findAllByOrderByNameAsc();
  }
}
