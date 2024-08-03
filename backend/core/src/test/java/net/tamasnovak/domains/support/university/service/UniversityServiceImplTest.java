package net.tamasnovak.domains.support.university.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.shared.constants.GlobalServiceConstants;
import net.tamasnovak.domains.support.country.entity.Country;
import net.tamasnovak.domains.support.country.service.CountryService;
import net.tamasnovak.domains.support.university.dto.UniversitySelectOption;
import net.tamasnovak.domains.support.university.entity.University;
import net.tamasnovak.domains.support.university.persistence.UniversityRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Description;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UniversityServiceImplTest {
  @Mock
  CountryService countryService;

  @Mock
  UniversityRepository universityRepository;

  @Mock
  GlobalServiceConstants globalServiceConstants;

  @InjectMocks
  UniversityServiceImpl underTest;

  private final UUID universityUuid = UUID.randomUUID();
  private final University expected = mock(University.class);

  @Nested
  @DisplayName("getByUuid() unit tests")
  class GetByUuidUnitTests {
    @Test
    @Description("Returns the correct University object.")
    void shouldReturnUniversityRecord() {
      when(universityRepository.findByUuid(universityUuid)).thenReturn(Optional.of(expected));

      University actual = underTest.getByUuid(universityUuid.toString());

      assertEquals(expected, actual);

      verify(universityRepository, times(1)).findByUuid(universityUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if no University record is found.")
    void shouldThrowEntityNotFoundException_IfUniversityIsNotFound() {
      when(universityRepository.findByUuid(universityUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.getByUuid(universityUuid.toString()));

      verify(universityRepository, times(1)).findByUuid(universityUuid);
    }
  }

  @Nested
  @DisplayName("getAllSelectOptionsByCountryUuid() unit tests")
  class GetAllSelectOptionsByCountryUuidUnitTests {
    @Test
    @Description("Returns the correct list of UniversitySelectOptionDto records.")
    void shouldReturnAllUniversitySelectOptionDtos() {
      Country mockCountry = mock(Country.class);
      when(mockCountry.getUuid()).thenReturn(UUID.randomUUID());
      List<UniversitySelectOption> expected = Collections.singletonList(mock(UniversitySelectOption.class));

      when(countryService.getByUuid(mockCountry.getUuid().toString())).thenReturn(mockCountry);
      when(universityRepository.findByCountryOrderByNameAsc(mockCountry)).thenReturn(expected);

      List<UniversitySelectOption> actual = underTest.getAllSelectOptionsByCountryUuid(mockCountry.getUuid().toString());

      assertEquals(expected, actual);

      verify(countryService, times(1)).getByUuid(mockCountry.getUuid().toString());
      verify(universityRepository, times(1)).findByCountryOrderByNameAsc(mockCountry);
    }
  }
}
