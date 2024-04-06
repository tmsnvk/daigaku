package net.tamasnovak.services.offerStatus;

import net.tamasnovak.dtos.offerStatus.OfferStatusFormDto;
import net.tamasnovak.entities.application.OfferStatus;
import net.tamasnovak.repositories.OfferStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OfferStatusServiceImpl implements OfferStatusService {
  private final OfferStatusRepository offerStatusRepository;
  private final OfferStatusMapper offerStatusMapper;

  @Autowired
  public OfferStatusServiceImpl(OfferStatusRepository offerStatusRepository, OfferStatusMapper offerStatusMapper) {
    this.offerStatusRepository = offerStatusRepository;
    this.offerStatusMapper = offerStatusMapper;
  }

  @Override
  @Transactional(readOnly = true)
  public List<OfferStatusFormDto> findAll() {
    List<OfferStatus> offerStatuses = offerStatusRepository.findAll();

    return offerStatuses.stream()
      .map(offerStatusMapper::toOfferStatusFormDto)
      .collect(Collectors.toList());
  }
}
