package net.tamasnovak.services.offerStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.offerStatus.response.OfferStatusOptionDto;
import net.tamasnovak.entities.application.OfferStatus;
import net.tamasnovak.repositories.offerStatus.OfferStatusRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.utilities.ValidatorUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OfferStatusServiceImpl implements OfferStatusService {
  private final OfferStatusRepository offerStatusRepository;
  private final OfferStatusMapper offerStatusMapper;
  private final ValidatorUtilities validatorUtilities;
  private final GlobalServiceConstants globalServiceConstants;

  @Autowired
  public OfferStatusServiceImpl(OfferStatusRepository offerStatusRepository, OfferStatusMapper offerStatusMapper, ValidatorUtilities validatorUtilities, GlobalServiceConstants globalServiceConstants) {
    this.offerStatusRepository = offerStatusRepository;
    this.offerStatusMapper = offerStatusMapper;
    this.validatorUtilities = validatorUtilities;
    this.globalServiceConstants = globalServiceConstants;
  }

  @Override
  @Transactional(readOnly = true)
  public List<OfferStatusOptionDto> findAll() {
    List<OfferStatus> offerStatuses = offerStatusRepository.findAll();

    return offerStatuses.stream()
      .map(offerStatusMapper::toOfferStatusFormDto)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public OfferStatus findByUuid(String uuid) {
    UUID validUuid = validatorUtilities.validateIfStringIsUuid(uuid, globalServiceConstants.NO_RESOURCE_FOUND);

    return offerStatusRepository.findByUuid(validUuid)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RESOURCE_FOUND));
  }
}
