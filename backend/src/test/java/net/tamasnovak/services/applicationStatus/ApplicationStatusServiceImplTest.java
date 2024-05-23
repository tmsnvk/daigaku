package net.tamasnovak.services.applicationStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.application.ApplicationStatus;
import net.tamasnovak.repositories.applicationStatus.ApplicationStatusRepository;
import net.tamasnovak.services.GlobalServiceConstants;
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
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
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
  @DisplayName("getStatusByName() unit tests")
  class GetStatusByNameUnitTests {
    @Test
    @Description("Returns the correct ApplicationStatus record.")
    void shouldReturnApplicationStatusRecord() {
      when(applicationStatusRepository.findByName(anyString())).thenReturn(Optional.of(expected));

      ApplicationStatus actual = underTest.getStatusByName(anyString());

      assertEquals(expected, actual);

      verify(applicationStatusRepository, times(1)).findByName(anyString());
    }

    @Test
    @Description("Throws EntityNotFoundException if no ApplicationStatus record is found.")
    void shouldThrowEntityNotFoundException_IfApplicationStatusIsNotFound() {
      when(applicationStatusRepository.findByName(anyString())).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.getStatusByName(anyString()));

      verify(applicationStatusRepository, times(1)).findByName(anyString());
    }
  }

  @Nested
  @DisplayName("getStatusByUuid() unit tests")
  class GetStatusByUuidUnitTests {
    @Test
    @Description("Returns the correct ApplicationStatus record.")
    void shouldReturnApplicationStatusRecord() {
      when(applicationStatusRepository.findByUuid(applicationStatusUuid)).thenReturn(Optional.of(expected));

      ApplicationStatus actual = underTest.getStatusByUuid(applicationStatusUuid.toString());

      assertEquals(expected, actual);

      verify(applicationStatusRepository, times(1)).findByUuid(applicationStatusUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if no ApplicationStatus record is found")
    void shouldThrowEntityNotFoundException_IfApplicationStatusIsNotFound() {
      when(applicationStatusRepository.findByUuid(applicationStatusUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.getStatusByUuid(applicationStatusUuid.toString()));

      verify(applicationStatusRepository, times(1)).findByUuid(applicationStatusUuid);
    }
  }

  @Nested
  @DisplayName("getStatusByUuidOnApplicationUpdate() unit tests")
  class GetStatusByUuidOnApplicationUpdate {
    @Test
    @Description("Returns currentStatus if currentStatus's UUID and newStatusUuid are equal.")
    void shouldReturnCurrentStatus_IfCurrentStatusUuidAndNewStatusUuidAreEqual() {
      String newStatusUuid = applicationStatusUuid.toString();

      when(expected.getUuid()).thenReturn(applicationStatusUuid);
      ApplicationStatus actual = underTest.getStatusByUuidOnApplicationUpdate(expected, newStatusUuid);

      assertEquals(expected, actual);

      verify(applicationStatusRepository, never()).findByUuid(applicationStatusUuid);
    }

    @Test
    @Description("Returns newStatusUuid if currentStatus's UUID and newStatusUuid are not equal.")
    void shouldReturnNewStatusUuid_IfCurrentStatusUuidAndNewStatusUuidAreNotEqual() {
      UUID newStatusUuid = UUID.randomUUID();
      ApplicationStatus actualApplicationStatus = mock(ApplicationStatus.class);

      when(expected.getUuid()).thenReturn(applicationStatusUuid);
      when(applicationStatusRepository.findByUuid(newStatusUuid)).thenReturn(Optional.of(actualApplicationStatus));
      ApplicationStatus actual = underTest.getStatusByUuidOnApplicationUpdate(expected, newStatusUuid.toString());

      verify(applicationStatusRepository, times(1)).findByUuid(newStatusUuid);

      assertNotEquals(expected, actual);
    }
  }

  @Nested
  @DisplayName("getAllSelectOptionViews() unit tests")
  class GetAllSelectOptionViewsUnitTests {
    @Test
    @Description("Returns the correct list of StatusSelectOptionView records.")
    void shouldReturnAllStatusSelectOptionViews() {
      List<StatusSelectOptionView> expected = Collections.singletonList(mock(StatusSelectOptionView.class));

      when(applicationStatusRepository.findAllByOrderByNameAsc()).thenReturn(expected);
      List<StatusSelectOptionView> actual = underTest.getAllSelectOptionViews();

      assertEquals(expected, actual);

      verify(applicationStatusRepository, times(1)).findAllByOrderByNameAsc();
    }
  }
}
