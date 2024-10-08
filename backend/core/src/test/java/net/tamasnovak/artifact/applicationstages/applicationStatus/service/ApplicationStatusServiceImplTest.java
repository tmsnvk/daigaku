package net.tamasnovak.artifact.applicationstages.applicationStatus.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstages.applicationStatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstages.applicationStatus.persistence.ApplicationStatusRepository;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;
import net.tamasnovak.artifact.shared.constants.GlobalServiceConstants;
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
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ApplicationStatusServiceImplTest {
  @Mock
  ApplicationStatusRepository applicationStatusRepository;

  @Mock
  GlobalServiceConstants globalServiceConstants;

  @InjectMocks
  ApplicationStatusServiceImpl underTest;

  private final UUID applicationStatusUuid = UUID.randomUUID();
  private final ApplicationStatus expected = mock(ApplicationStatus.class);

  @Nested
  @DisplayName("getByName() unit tests")
  class GetByNameUnitTests {
    @Test
    @Description("Returns the correct ApplicationStatus record.")
    void shouldReturnApplicationStatusRecord() {
      when(applicationStatusRepository.findByName(anyString())).thenReturn(Optional.of(expected));

      ApplicationStatus actual = underTest.findByName(anyString());

      assertEquals(expected, actual);

      verify(applicationStatusRepository, times(1)).findByName(anyString());
    }

    @Test
    @Description("Throws EntityNotFoundException if no ApplicationStatus record is found.")
    void shouldThrowEntityNotFoundException_IfApplicationStatusIsNotFound() {
      when(applicationStatusRepository.findByName(anyString())).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findByName(anyString()));

      verify(applicationStatusRepository, times(1)).findByName(anyString());
    }
  }

  @Nested
  @DisplayName("getByUuid() unit tests")
  class GetByUuidUnitTests {
    @Test
    @Description("Returns the correct ApplicationStatus record.")
    void shouldReturnApplicationStatusRecord() {
      when(applicationStatusRepository.findByUuid(applicationStatusUuid)).thenReturn(Optional.of(expected));

      ApplicationStatus actual = underTest.findByUuid(applicationStatusUuid);

      assertEquals(expected, actual);

      verify(applicationStatusRepository, times(1)).findByUuid(applicationStatusUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if no ApplicationStatus record is found")
    void shouldThrowEntityNotFoundException_IfApplicationStatusIsNotFound() {
      when(applicationStatusRepository.findByUuid(applicationStatusUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findByUuid(applicationStatusUuid));

      verify(applicationStatusRepository, times(1)).findByUuid(applicationStatusUuid);
    }
  }

  @Nested
  @DisplayName("getAllSelectOptions() unit tests")
  class GetAllSelectOptionsUnitTests {
    @Test
    @Description("Returns the correct list of StatusSelectOptionView records.")
    void shouldReturnAllStatusSelectOptionViews() {
      List<StatusDropdownOption> expected = Collections.singletonList(mock(StatusDropdownOption.class));

      when(applicationStatusRepository.findAllByOrderByNameAsc()).thenReturn(expected);
      List<StatusDropdownOption> actual = underTest.findAllSortedByName();

      assertEquals(expected, actual);

      verify(applicationStatusRepository, times(1)).findAllByOrderByNameAsc();
    }
  }
}
