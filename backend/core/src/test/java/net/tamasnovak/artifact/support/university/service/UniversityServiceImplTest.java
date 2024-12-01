/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.university.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.support.country.entity.Country;
import net.tamasnovak.artifact.support.country.service.CountryService;
import net.tamasnovak.artifact.support.university.dto.UniversitySelectOption;
import net.tamasnovak.artifact.support.university.entity.University;
import net.tamasnovak.artifact.support.university.persistence.UniversityRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Description;

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

  @InjectMocks
  UniversityServiceImpl underTest;

  private final UUID universityUuid = UUID.randomUUID();
  private final University expected = mock(University.class);

  @Nested
  @DisplayName("findUniversityByUuid() unit tests")
  class FindUniversityByUuidUnitTests {
    @Test
    @Description("Returns the correct University record.")
    void shouldReturnUniversityRecord() {
      when(universityRepository.findUniversityByUuid(universityUuid)).thenReturn(Optional.of(expected));

      University actual = underTest.findUniversityByUuid(universityUuid);

      assertEquals(expected, actual);
      verify(universityRepository, times(1)).findUniversityByUuid(universityUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if no University record is found.")
    void shouldThrowEntityNotFoundException_IfUniversityIsNotFound() {
      when(universityRepository.findUniversityByUuid(universityUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findUniversityByUuid(universityUuid));
      verify(universityRepository, times(1)).findUniversityByUuid(universityUuid);
    }
  }

  @Nested
  @DisplayName("findUniversitiesByCountryUuid() unit tests")
  class FindUniversitiesByCountryUuidUnitTests {
    @Test
    @Description("Returns the correct list of UniversitySelectOption records.")
    void shouldReturnUniversitySelectOptionListByCountryUuid() {
      Country mockCountry = mock(Country.class);
      when(mockCountry.getUuid()).thenReturn(UUID.randomUUID());
      List<UniversitySelectOption> expected = Collections.singletonList(mock(UniversitySelectOption.class));

      when(countryService.findCountryByUuid(mockCountry.getUuid())).thenReturn(mockCountry);
      when(universityRepository.findByCountryOrderByNameAsc(mockCountry)).thenReturn(expected);

      List<UniversitySelectOption> actual = underTest.findUniversitiesByCountryUuid(mockCountry.getUuid());

      assertEquals(expected, actual);
      verify(countryService, times(1)).findCountryByUuid(mockCountry.getUuid());
      verify(universityRepository, times(1)).findByCountryOrderByNameAsc(mockCountry);
    }
  }
}
