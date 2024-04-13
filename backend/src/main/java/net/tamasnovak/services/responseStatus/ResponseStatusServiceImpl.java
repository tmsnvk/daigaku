package net.tamasnovak.services.responseStatus;

import net.tamasnovak.dtos.responseStatus.response.ResponseStatusOptionDto;
import net.tamasnovak.entities.application.ResponseStatus;
import net.tamasnovak.repositories.responseStatus.ResponseStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ResponseStatusServiceImpl implements ResponseStatusService {
  private final ResponseStatusRepository responseStatusRepository;
  private final ResponseStatusMapper responseStatusMapper;

  @Autowired
  public ResponseStatusServiceImpl(ResponseStatusRepository responseStatusRepository, ResponseStatusMapper responseStatusMapper) {
    this.responseStatusRepository = responseStatusRepository;
    this.responseStatusMapper = responseStatusMapper;
  }

  @Override
  @Transactional(readOnly = true)
  public ResponseStatus findByName(String statusName) {
    return responseStatusRepository.findByName(statusName);
  }



  @Override
  @Transactional(readOnly = true)
  public List<ResponseStatusOptionDto> findAll() {
    List<ResponseStatus> responseStatuses = responseStatusRepository.findAll();

    return responseStatuses.stream()
      .map(responseStatusMapper::toResponseStatusFormDto)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional(readOnly = true)
  public ResponseStatus findByUuid(UUID uuid) {
    return responseStatusRepository.findByUuid(uuid);
  }
}
