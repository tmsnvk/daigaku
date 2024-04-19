package net.tamasnovak.services.offerStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.application.OfferStatus;
import net.tamasnovak.projections.status.GenericStatusView;
import net.tamasnovak.repositories.offerStatus.OfferStatusRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.utilities.ValidatorUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class OfferStatusServiceImpl implements OfferStatusService {
  private final OfferStatusRepository offerStatusRepository;
  private final ValidatorUtilities validatorUtilities;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public OfferStatusServiceImpl(OfferStatusRepository offerStatusRepository, ValidatorUtilities validatorUtilities, GlobalServiceConstants globalServiceConstants) {
    this.offerStatusRepository = offerStatusRepository;
    this.validatorUtilities = validatorUtilities;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<GenericStatusView> findAll() {
    return offerStatusRepository.findAllProjectedBy();
  }

  @Override
  @Transactional(readOnly = true)
  public OfferStatus findByUuid(String uuid) {
    UUID validUuid = validatorUtilities.validateIfStringIsUuid(uuid);

    return offerStatusRepository.findByUuid(validUuid)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
