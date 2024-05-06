package net.tamasnovak.services.responseStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.application.ResponseStatus;
import net.tamasnovak.dtos.status.StatusOptionView;
import net.tamasnovak.repositories.responseStatus.ResponseStatusRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
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
  public List<StatusOptionView> getDropdownOptions() {
    return responseStatusRepository.findAllByOrderByNameAsc();
  }

  @Override
  @Transactional(readOnly = true)
  public ResponseStatus findByUuid(String uuid) {
    return responseStatusRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public ResponseStatus findByUuidOrReturnNull(String uuid) {
    if (Objects.equals(uuid, "")) {
      return null;
    }

    return findByUuid(uuid);
  }
}
