package net.tamasnovak.artifact.applicationstatus.applicationstatus.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.entity.ApplicationStatus;
import net.tamasnovak.artifact.applicationstatus.applicationstatus.persistence.ApplicationStatusRepository;
import net.tamasnovak.artifact.applicationstatus.shared.dto.StatusDropdownOption;
import net.tamasnovak.artifact.common.constants.GlobalServiceMessages;
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

  @Mock
  GlobalServiceMessages globalServiceMessages;

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
      when(applicationStatusRepository.findApplicationStatusByName(anyString())).thenReturn(Optional.of(expected));

      ApplicationStatus actual = underTest.findApplicationStatusByName(anyString());

      assertEquals(expected, actual);

      verify(applicationStatusRepository, times(1)).findApplicationStatusByName(anyString());
    }

    @Test
    @Description("Throws EntityNotFoundException if no ApplicationStatus record is found.")
    void shouldThrowEntityNotFoundException_IfApplicationStatusIsNotFound() {
      when(applicationStatusRepository.findApplicationStatusByName(anyString())).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findApplicationStatusByName(anyString()));

      verify(applicationStatusRepository, times(1)).findApplicationStatusByName(anyString());
    }
  }

  @Nested
  @DisplayName("getByUuid() unit tests")
  class GetByUuidUnitTests {
    @Test
    @Description("Returns the correct ApplicationStatus record.")
    void shouldReturnApplicationStatusRecord() {
      when(applicationStatusRepository.findApplicationStatusByUuid(applicationStatusUuid)).thenReturn(Optional.of(expected));

      ApplicationStatus actual = underTest.findApplicationStatusByUuid(applicationStatusUuid);

      assertEquals(expected, actual);

      verify(applicationStatusRepository, times(1)).findApplicationStatusByUuid(applicationStatusUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if no ApplicationStatus record is found")
    void shouldThrowEntityNotFoundException_IfApplicationStatusIsNotFound() {
      when(applicationStatusRepository.findApplicationStatusByUuid(applicationStatusUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findApplicationStatusByUuid(applicationStatusUuid));

      verify(applicationStatusRepository, times(1)).findApplicationStatusByUuid(applicationStatusUuid);
    }
  }

  @Nested
  @DisplayName("getAllSelectOptions() unit tests")
  class GetAllSelectOptionsUnitTests {
    @Test
    @Description("Returns the correct list of StatusSelectOptionView records.")
    void shouldReturnAllStatusSelectOptionViews() {
      List<StatusDropdownOption> expected = Collections.singletonList(mock(StatusDropdownOption.class));

      when(applicationStatusRepository.findSelectOptionsByOrderByNameAsc()).thenReturn(expected);
      List<StatusDropdownOption> actual = underTest.findSelectOptionsSortedByName();

      assertEquals(expected, actual);

      verify(applicationStatusRepository, times(1)).findSelectOptionsByOrderByNameAsc();
    }
  }
}
