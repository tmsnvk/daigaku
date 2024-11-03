package net.tamasnovak.artifact.support.university.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
import net.tamasnovak.artifact.support.country.entity.Country;
import net.tamasnovak.artifact.support.country.service.CountryService;
import net.tamasnovak.artifact.support.university.dto.UniversityDropdownOption;
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

  @Mock
  GlobalServiceMessages globalServiceMessages;

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

      University actual = underTest.findByUuid(universityUuid);

      assertEquals(expected, actual);

      verify(universityRepository, times(1)).findByUuid(universityUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if no University record is found.")
    void shouldThrowEntityNotFoundException_IfUniversityIsNotFound() {
      when(universityRepository.findByUuid(universityUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findByUuid(universityUuid));

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
      List<UniversityDropdownOption> expected = Collections.singletonList(mock(UniversityDropdownOption.class));

      when(countryService.findByUuid(mockCountry.getUuid())).thenReturn(mockCountry);
      when(universityRepository.findByCountryOrderByNameAsc(mockCountry)).thenReturn(expected);

      List<UniversityDropdownOption> actual = underTest.findAllByCountryUuidAndSortedByName(mockCountry.getUuid());

      assertEquals(expected, actual);

      verify(countryService, times(1)).findByUuid(mockCountry.getUuid());
      verify(universityRepository, times(1)).findByCountryOrderByNameAsc(mockCountry);
    }
  }
}
