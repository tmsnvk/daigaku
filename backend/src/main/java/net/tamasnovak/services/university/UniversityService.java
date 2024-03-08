package net.tamasnovak.services.university;

import lombok.RequiredArgsConstructor;
import net.tamasnovak.controllers.university.UniversityMapper;
import net.tamasnovak.dtos.university.UniversityOptionDto;
import net.tamasnovak.entities.Country;
import net.tamasnovak.entities.University;
import net.tamasnovak.repositories.UniversityRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public final class UniversityService {
  private final UniversityMapper universityMapper;
  public final UniversityRepository universityRepository;

  public List<UniversityOptionDto> findAll() {
    List<University> universities = universityRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));

    return universities.stream()
      .map(universityMapper::toOptionDto)
      .collect(Collectors.toList());
  }

  public List<UniversityOptionDto> findByCountryId(Country countryId) {
    List<University> universities = universityRepository.findUniversitiesByCountryId(countryId);

    return universities.stream()
      .map(universityMapper::toOptionDto)
      .collect(Collectors.toList());
  }
}
