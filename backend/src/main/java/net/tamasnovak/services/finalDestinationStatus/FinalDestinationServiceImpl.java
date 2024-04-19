package net.tamasnovak.services.finalDestinationStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.projections.status.GenericStatusView;
import net.tamasnovak.repositories.finalDestinationStatus.FinalDestinationStatusRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.utilities.ValidatorUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class FinalDestinationServiceImpl implements FinalDestinationStatusService{
  private final FinalDestinationStatusRepository finalDestinationStatusRepository;
  private final ValidatorUtilities validatorUtilities;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public FinalDestinationServiceImpl(FinalDestinationStatusRepository finalDestinationStatusRepository, ValidatorUtilities validatorUtilities, GlobalServiceConstants globalServiceConstants) {
    this.finalDestinationStatusRepository = finalDestinationStatusRepository;
    this.validatorUtilities = validatorUtilities;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<GenericStatusView> findAll() {
    return finalDestinationStatusRepository.findAllProjectedBy();
  }

  @Override
  @Transactional(readOnly = true)
  public FinalDestinationStatus findByUuid(String uuid) {
    UUID validUuid = validatorUtilities.validateIfStringIsUuid(uuid);

    return finalDestinationStatusRepository.findByUuid(validUuid)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
