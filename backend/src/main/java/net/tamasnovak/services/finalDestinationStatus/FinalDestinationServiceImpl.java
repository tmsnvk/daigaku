package net.tamasnovak.services.finalDestinationStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.projections.status.StatusOptionView;
import net.tamasnovak.repositories.finalDestinationStatus.FinalDestinationStatusRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.utilities.ValidatorUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
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
  public List<StatusOptionView> getDropdownOptions() {
    return finalDestinationStatusRepository.findAllByOrderByNameAsc();
  }

  @Override
  @Transactional(readOnly = true)
  public FinalDestinationStatus findByUuid(String uuid) {
    UUID validUuid = validatorUtilities.validateIfStringIsUuid(uuid);

    return finalDestinationStatusRepository.findByUuid(validUuid)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }

  @Override
  @Transactional(readOnly = true)
  public FinalDestinationStatus findByUuidOrReturnNull(String uuid) {
    if (Objects.equals(uuid, "")) {
      return null;
    }

    return findByUuid(uuid);
  }
}
