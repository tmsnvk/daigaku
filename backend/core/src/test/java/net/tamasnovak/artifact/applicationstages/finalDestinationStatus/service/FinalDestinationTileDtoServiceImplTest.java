package net.tamasnovak.artifact.applicationstages.finalDestinationStatus.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstages.finalDestinationStatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstages.finalDestinationStatus.persistence.FinalDestinationStatusRepository;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusDropdownOption;
import net.tamasnovak.artifact.common.constants.GlobalServiceConstants;
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
class FinalDestinationTileDtoServiceImplTest {
  @Mock
  FinalDestinationStatusRepository finalDestinationStatusRepository;

  @Mock
  GlobalServiceConstants globalServiceConstants;

  @InjectMocks
  FinalDestinationServiceImpl underTest;

  private final UUID finalDestinationUuid = UUID.randomUUID();
  private final FinalDestinationStatus expected = mock(FinalDestinationStatus.class);

  @Nested
  @DisplayName("getByUuid() unit tests")
  class GetByUuidUnitTests {
    @Test
    @Description("Returns the correct FinalDestinationStatus record.")
    void shouldReturnFinalDestinationStatusRecord() {
      when(finalDestinationStatusRepository.findByUuid(finalDestinationUuid)).thenReturn(Optional.of(expected));

      FinalDestinationStatus actual = underTest.findByUuid(finalDestinationUuid);

      assertEquals(expected, actual);

      verify(finalDestinationStatusRepository, times(1)).findByUuid(finalDestinationUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if no FinalDestinationStatus record is found.")
    void shouldThrowEntityNotFoundException_IfFinalDestinationStatusIsNotFound() {
      when(finalDestinationStatusRepository.findByUuid(finalDestinationUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findByUuid(finalDestinationUuid));

      verify(finalDestinationStatusRepository, times(1)).findByUuid(finalDestinationUuid);
    }
  }

  @Nested
  @DisplayName("getByName() unit tests")
  class GetByNameUnitTests {
    @Test
    @Description("Returns the correct FinalDestinationStatus record.")
    void shouldReturnFinalDestinationStatusRecord() {
      when(finalDestinationStatusRepository.findByName(anyString())).thenReturn(Optional.of(expected));

      FinalDestinationStatus actual = underTest.findByName(anyString());

      assertEquals(expected, actual);

      verify(finalDestinationStatusRepository, times(1)).findByName(anyString());
    }

    @Test
    @Description("Throws EntityNotFoundException if no FinalDestinationStatus record is found.")
    void shouldThrowEntityNotFoundException_IfFinalDestinationStatusIsNotFound() {
      when(finalDestinationStatusRepository.findByName(anyString())).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findByName(anyString()));

      verify(finalDestinationStatusRepository, times(1)).findByName(anyString());
    }

    @Nested
    @DisplayName("getAllSelectOptions() unit tests")
    class GetAllSelectOptionsUnitTests {
      @Test
      @Description("Returns the correct list of StatusSelectOptionView records.")
      void shouldReturnAllStatusSelectOptionViews() {
        List<StatusDropdownOption> expected = Collections.singletonList(mock(StatusDropdownOption.class));
        when(finalDestinationStatusRepository.findAllByOrderByNameAsc()).thenReturn(expected);

        List<StatusDropdownOption> actual = underTest.findAllSortedByName();

        assertEquals(expected, actual);

        verify(finalDestinationStatusRepository, times(1)).findAllByOrderByNameAsc();
      }
    }
  }
}
