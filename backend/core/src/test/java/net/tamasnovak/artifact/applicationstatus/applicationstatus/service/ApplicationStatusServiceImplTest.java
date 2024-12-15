/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.applicationstatus.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.persistence.ApplicationStatusRepository;
import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
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
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ApplicationStatusServiceImplTest {
  @Mock
  ApplicationStatusRepository applicationStatusRepository;

  @InjectMocks
  ApplicationStatusServiceImpl underTest;

  private final UUID applicationStatusUuid = UUID.randomUUID();
  private final ApplicationStatus expected = mock(ApplicationStatus.class);

  @Nested
  @DisplayName("findStatusByName() unit tests")
  class FindStatusByNameUnitTests {
    @Test
    @Description("Returns the correct ApplicationStatus record.")
    void shouldReturnApplicationStatusRecord() {
      when(applicationStatusRepository.findApplicationStatusByName(anyString())).thenReturn(Optional.of(expected));

      ApplicationStatus actual = underTest.findStatusByName(anyString());

      assertEquals(expected, actual);
      verify(applicationStatusRepository, times(1)).findApplicationStatusByName(anyString());
    }

    @Test
    @Description("Throws EntityNotFoundException if no ApplicationStatus record is found.")
    void shouldThrowEntityNotFoundException_IfApplicationStatusIsNotFound() {
      when(applicationStatusRepository.findApplicationStatusByName(anyString())).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findStatusByName(anyString()));
      verify(applicationStatusRepository, times(1)).findApplicationStatusByName(anyString());
    }
  }

  @Nested
  @DisplayName("findStatusByUuid() unit tests")
  class FindStatusByUuidUnitTests {
    @Test
    @Description("Returns the correct ApplicationStatus record.")
    void shouldReturnApplicationStatusRecord() {
      when(applicationStatusRepository.findApplicationStatusByUuid(applicationStatusUuid)).thenReturn(Optional.of(expected));

      ApplicationStatus actual = underTest.findStatusByUuid(applicationStatusUuid);

      assertEquals(expected, actual);
      verify(applicationStatusRepository, times(1)).findApplicationStatusByUuid(applicationStatusUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if no ApplicationStatus record is found")
    void shouldThrowEntityNotFoundException_IfApplicationStatusIsNotFound() {
      when(applicationStatusRepository.findApplicationStatusByUuid(applicationStatusUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findStatusByUuid(applicationStatusUuid));
      verify(applicationStatusRepository, times(1)).findApplicationStatusByUuid(applicationStatusUuid);
    }
  }

  @Nested
  @DisplayName("findSelectOptionsSortedByName() unit tests")
  class FindSelectOptionsSortedByNameUnitTests {
    @Test
    @Description("Returns the correct list of StatusSelectOption records.")
    void shouldReturnAllStatusSelectOptionList() {
      List<StatusSelectOption> expected = Collections.singletonList(mock(StatusSelectOption.class));

      when(applicationStatusRepository.findSelectOptionsByOrderByNameAsc()).thenReturn(expected);
      List<StatusSelectOption> actual = underTest.findSelectOptionsSortedByName();

      assertEquals(expected, actual);
      verify(applicationStatusRepository, times(1)).findSelectOptionsByOrderByNameAsc();
    }
  }
}
