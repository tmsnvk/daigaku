package net.tamasnovak.services.responseStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.application.ResponseStatus;
import net.tamasnovak.projections.status.GenericStatusView;
import net.tamasnovak.repositories.responseStatus.ResponseStatusRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.utilities.ValidatorUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ResponseStatusServiceImpl implements ResponseStatusService {
  private final ResponseStatusRepository responseStatusRepository;
  private final ValidatorUtilities validatorUtilities;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public ResponseStatusServiceImpl(ResponseStatusRepository responseStatusRepository, ValidatorUtilities validatorUtilities, GlobalServiceConstants globalServiceConstants) {
    this.responseStatusRepository = responseStatusRepository;
    this.validatorUtilities = validatorUtilities;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<GenericStatusView> findAll() {
    return responseStatusRepository.findAllProjectedBy();
  }

  @Override
  @Transactional(readOnly = true)
  public ResponseStatus findByUuid(String uuid) {
    UUID validUuid = validatorUtilities.validateIfStringIsUuid(uuid);

    return responseStatusRepository.findByUuid(validUuid)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
