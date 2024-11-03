package net.tamasnovak.artifact.applicationstages.responseStatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstages.responseStatus.entity.ResponseStatus;
import net.tamasnovak.artifact.applicationstages.responseStatus.persistence.ResponseStatusRepository;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Qualifier(value = "ResponseStatusService")
public class ResponseStatusServiceImpl implements ResponseStatusService {
  private final ResponseStatusRepository responseStatusRepository;
  private final GlobalServiceMessages globalConstants;

  @Autowired
  public ResponseStatusServiceImpl(ResponseStatusRepository responseStatusRepository, GlobalServiceMessages globalConstants) {
    this.responseStatusRepository = responseStatusRepository;
    this.globalConstants = globalConstants;
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ResponseStatusByUuid", key = "{ #uuid }")
  public ResponseStatus findByUuid(final UUID uuid) {
    return responseStatusRepository.findByUuid(uuid)
                                   .orElseThrow(() -> new EntityNotFoundException(globalConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ResponseStatusByName", key = "{ #statusName }")
  public ResponseStatus findByName(final String statusName) {
    return responseStatusRepository.findByName(statusName)
                                   .orElseThrow(() -> new EntityNotFoundException(globalConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  @Cacheable(value = "ResponseStatusDropdownOption")
  public List<StatusDropdownOption> findAllSortedByName() {
    return responseStatusRepository.findAllByOrderByNameAsc();
  }
}
