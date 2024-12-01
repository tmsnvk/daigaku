/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstatus.finaldestinationstatus.persistence.FinalDestinationStatusRepository;
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
class FinalDestinationTileDetailsServiceImplTest {
  @Mock
  FinalDestinationStatusRepository finalDestinationStatusRepository;

  @Mock
  GlobalServiceMessages globalServiceMessages;

  @InjectMocks
  FinalDestinationStatusServiceImpl underTest;

  private final UUID finalDestinationUuid = UUID.randomUUID();
  private final FinalDestinationStatus expected = mock(FinalDestinationStatus.class);

  @Nested
  @DisplayName("findStatusByUuid() unit tests")
  class FindStatusByUuidUnitTests {
    @Test
    @Description("Returns the correct FinalDestinationStatus record.")
    void shouldReturnFinalDestinationStatusRecord() {
      when(finalDestinationStatusRepository.findFinalDestinationStatusByUuid(finalDestinationUuid)).thenReturn(Optional.of(expected));

      FinalDestinationStatus actual = underTest.findStatusByUuid(finalDestinationUuid);

      assertEquals(expected, actual);
      verify(finalDestinationStatusRepository, times(1)).findFinalDestinationStatusByUuid(finalDestinationUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if no FinalDestinationStatus record is found.")
    void shouldThrowEntityNotFoundException_IfFinalDestinationStatusIsNotFound() {
      when(finalDestinationStatusRepository.findFinalDestinationStatusByUuid(finalDestinationUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findStatusByUuid(finalDestinationUuid));
      verify(finalDestinationStatusRepository, times(1)).findFinalDestinationStatusByUuid(finalDestinationUuid);
    }
  }

  @Nested
  @DisplayName("findStatusByName() unit tests")
  class FindStatusByNameUnitTests {
    @Test
    @Description("Returns the correct FinalDestinationStatus record.")
    void shouldReturnFinalDestinationStatusRecord() {
      when(finalDestinationStatusRepository.findFinalDestinationStatusByName(anyString())).thenReturn(Optional.of(expected));

      FinalDestinationStatus actual = underTest.findStatusByName(anyString());

      assertEquals(expected, actual);
      verify(finalDestinationStatusRepository, times(1)).findFinalDestinationStatusByName(anyString());
    }

    @Test
    @Description("Throws EntityNotFoundException if no FinalDestinationStatus record is found.")
    void shouldThrowEntityNotFoundException_IfFinalDestinationStatusIsNotFound() {
      when(finalDestinationStatusRepository.findFinalDestinationStatusByName(anyString())).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findStatusByName(anyString()));
      verify(finalDestinationStatusRepository, times(1)).findFinalDestinationStatusByName(anyString());
    }

    @Nested
    @DisplayName("findSelectOptionsSortedByName() unit tests")
    class FindSelectOptionsSortedByNameUnitTests {
      @Test
      @Description("Returns the correct list of StatusSelectOption records.")
      void shouldReturnAllStatusSelectOptionList() {
        List<StatusSelectOption> expected = Collections.singletonList(mock(StatusSelectOption.class));
        when(finalDestinationStatusRepository.findSelectOptionsByOrderByNameAsc()).thenReturn(expected);

        List<StatusSelectOption> actual = underTest.findSelectOptionsSortedByName();

        assertEquals(expected, actual);
        verify(finalDestinationStatusRepository, times(1)).findSelectOptionsByOrderByNameAsc();
      }
    }
  }
}
