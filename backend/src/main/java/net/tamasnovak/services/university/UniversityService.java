package net.tamasnovak.services.university;

import net.tamasnovak.controllers.university.UniversityControllerMessages;
import net.tamasnovak.dtos.university.UniversityOptionDto;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.exceptions.dbReourseNotFound.DbResourceNotFoundException;
import net.tamasnovak.repositories.UniversityRepository;
import net.tamasnovak.services.country.CountryService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public final class UniversityService {
  private final CountryService countryService;
  private final UniversityMapper universityMapper;
  private final UniversityRepository universityRepository;
  private final UniversityControllerMessages universityControllerMessages;

  public UniversityService(CountryService countryService, UniversityMapper universityMapper, UniversityRepository universityRepository, UniversityControllerMessages universityControllerMessages) {
    this.countryService = countryService;
    this.universityMapper = universityMapper;
    this.universityRepository = universityRepository;
    this.universityControllerMessages = universityControllerMessages;
  }

  public List<UniversityOptionDto> findAll() {
    List<University> universities = universityRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));

    return universities.stream()
      .map(universityMapper::toOptionDto)
      .collect(Collectors.toList());
  }

  public List<UniversityOptionDto> findByCountryId(UUID countryUuid) {
    Country country = countryService.findByUuid(countryUuid)
      .orElseThrow(() -> new DbResourceNotFoundException(universityControllerMessages.DB_RESOURCE_NOT_FOUND));

    List<University> universities = universityRepository.findUniversitiesByCountryId(country);

    return universities.stream()
      .map(universityMapper::toOptionDto)
      .collect(Collectors.toList());
  }

  public Optional<University> findByUuid(UUID universityId) {
    return universityRepository.findByUuid(universityId);
  }
}
