package net.tamasnovak.services.university;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.projections.university.UniversityOptionView;
import net.tamasnovak.repositories.university.UniversityRepository;
import net.tamasnovak.services.GlobalServiceConstants;
import net.tamasnovak.services.country.CountryService;
import net.tamasnovak.utilities.ValidatorUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class UniversityServiceImpl implements UniversityService {
  private final CountryService countryService;
  private final UniversityRepository universityRepository;
  private final GlobalServiceConstants globalServiceConstants;
  private final ValidatorUtilities validatorUtilities;

  @Autowired
  public UniversityServiceImpl(CountryService countryService, UniversityRepository universityRepository, GlobalServiceConstants globalServiceConstants, ValidatorUtilities validatorUtilities) {
    this.countryService = countryService;
    this.universityRepository = universityRepository;
    this.globalServiceConstants = globalServiceConstants;
    this.validatorUtilities = validatorUtilities;
  }

  @Override
  @Transactional(readOnly = true)
  public List<UniversityOptionView> getDropdownOptionsByCountryUuidAndSortedAscByName(String countryUuid) {
    UUID validCountryUuid = validatorUtilities.validateIfStringIsUuid(countryUuid);
    Country country = countryService.findByUuid(validCountryUuid);

    return universityRepository.findByCountryOrderByNameAsc(country);
  }

  @Override
  @Transactional(readOnly = true)
  public University findByUuid(UUID universityUuid) {
    return universityRepository.findByUuid(universityUuid)
      .orElseThrow(() -> new EntityNotFoundException(globalServiceConstants.NO_RECORD_FOUND));
  }
}
