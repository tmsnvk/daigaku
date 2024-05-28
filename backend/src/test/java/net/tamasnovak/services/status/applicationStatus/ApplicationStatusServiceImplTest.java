package net.tamasnovak.services.status.applicationStatus;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.status.StatusSelectOptionView;
import net.tamasnovak.entities.status.ApplicationStatus;
import net.tamasnovak.repositories.status.applicationStatus.ApplicationStatusRepository;
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
  @DisplayName("getStatusByName() unit tests")
  class GetStatusByNameUnitTests {
    @Test
    @Description("Returns the correct ApplicationStatus record.")
    void shouldReturnApplicationStatusRecord() {
      when(applicationStatusRepository.findByName(anyString())).thenReturn(Optional.of(expected));

      ApplicationStatus actual = underTest.getByName(anyString());

      assertEquals(expected, actual);

      verify(applicationStatusRepository, times(1)).findByName(anyString());
    }

    @Test
    @Description("Throws EntityNotFoundException if no ApplicationStatus record is found.")
    void shouldThrowEntityNotFoundException_IfApplicationStatusIsNotFound() {
      when(applicationStatusRepository.findByName(anyString())).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.getByName(anyString()));

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

      ApplicationStatus actual = underTest.getByUuid(applicationStatusUuid.toString());

      assertEquals(expected, actual);

      verify(applicationStatusRepository, times(1)).findByUuid(applicationStatusUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if no ApplicationStatus record is found")
    void shouldThrowEntityNotFoundException_IfApplicationStatusIsNotFound() {
      when(applicationStatusRepository.findByUuid(applicationStatusUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.getByUuid(applicationStatusUuid.toString()));

      verify(applicationStatusRepository, times(1)).findByUuid(applicationStatusUuid);
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
