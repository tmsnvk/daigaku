package net.tamasnovak.artifact.support.institution.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.shared.constants.GlobalServiceConstants;
import net.tamasnovak.artifact.support.institution.dto.InstitutionDropdownOption;
import net.tamasnovak.artifact.support.institution.entity.Institution;
import net.tamasnovak.artifact.support.institution.persistence.InstitutionRepository;
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
class InstitutionServiceImplTest {
  @Mock
  InstitutionRepository institutionRepository;

  @Mock
  GlobalServiceConstants globalServiceConstants;

  @InjectMocks
  InstitutionServiceImpl underTest;

  private final UUID institutionUuid = UUID.randomUUID();
  private final Institution expected = mock(Institution.class);

  @Nested
  @DisplayName("getByUuid() unit tests")
  class GetByUuidUnitTests {
    @Test
    @Description("Returns the correct Institution object.")
    void shouldReturnInstitutionRecord() {
      when(institutionRepository.findByUuid(institutionUuid)).thenReturn(Optional.of(expected));

      Institution actual = underTest.findByUuid(institutionUuid);

      assertEquals(expected, actual);

      verify(institutionRepository, times(1)).findByUuid(institutionUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if no Institution record is found.")
    void shouldThrowEntityNotFoundException_IfInstitutionIsNotFound() {
      when(institutionRepository.findByUuid(institutionUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findByUuid(institutionUuid));

      verify(institutionRepository, times(1)).findByUuid(institutionUuid);
    }
  }

  @Nested
  @DisplayName("getAllSelectOptions() unit tests")
  class GetAllSelectOptionsUnitTests {
    @Test
    @Description("Returns the correct list of InstitutionOptionDto records.")
    void shouldReturnAllInstitutionOptionDtos() {
      List<InstitutionDropdownOption> expected = Collections.singletonList(mock(InstitutionDropdownOption.class));

      when(institutionRepository.findAllByOrderByNameAsc()).thenReturn(expected);
      List<InstitutionDropdownOption> actual = underTest.findAllSortedByName();

      assertEquals(expected, actual);

      verify(institutionRepository, times(1)).findAllByOrderByNameAsc();
    }
  }
}
