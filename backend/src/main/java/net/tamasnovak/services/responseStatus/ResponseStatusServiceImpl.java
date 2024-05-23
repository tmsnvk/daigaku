package net.tamasnovak.services.responseStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.ResponseStatus;
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
  public List<StatusSelectOptionView> getAllSelectOptionViews() {
    return responseStatusRepository.findAllByOrderByNameAsc();
  }

  @Override
  @Transactional(readOnly = true)
  public ResponseStatus getStatusByUuid(String uuid) {
    return responseStatusRepository.findByUuid(UUID.fromString(uuid))
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public ResponseStatus getStatusByUuidOnApplicationUpdate(ResponseStatus currentStatus, String requestBodyStatusUuid) {
    if (currentStatus != null) {
      if (Objects.equals(currentStatus.getUuid().toString(), requestBodyStatusUuid)) {
        return currentStatus;
      }
    }

    if (Objects.equals(requestBodyStatusUuid, "")) {
      return null;
    }

    return getStatusByUuid(requestBodyStatusUuid);
  }
}
