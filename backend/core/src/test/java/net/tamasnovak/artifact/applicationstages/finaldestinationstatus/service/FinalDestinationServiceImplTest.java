package net.tamasnovak.artifact.applicationstages.finaldestinationstatus.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstages.finaldestinationstatus.entity.FinalDestinationStatus;
import net.tamasnovak.artifact.applicationstages.finaldestinationstatus.persistence.FinalDestinationStatusRepository;
import net.tamasnovak.artifact.applicationstages.shared.dto.StatusSelectOption;
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
class FinalDestinationServiceImplTest {
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

			FinalDestinationStatus actual = underTest.getByUuid(finalDestinationUuid);

			assertEquals(expected, actual);

			verify(finalDestinationStatusRepository, times(1)).findByUuid(finalDestinationUuid);
		}

		@Test
		@Description("Throws EntityNotFoundException if no FinalDestinationStatus record is found.")
		void shouldThrowEntityNotFoundException_IfFinalDestinationStatusIsNotFound() {
			when(finalDestinationStatusRepository.findByUuid(finalDestinationUuid)).thenReturn(Optional.empty());

			assertThrows(EntityNotFoundException.class, () -> underTest.getByUuid(finalDestinationUuid));

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

			FinalDestinationStatus actual = underTest.getByName(anyString());

			assertEquals(expected, actual);

			verify(finalDestinationStatusRepository, times(1)).findByName(anyString());
		}

		@Test
		@Description("Throws EntityNotFoundException if no FinalDestinationStatus record is found.")
		void shouldThrowEntityNotFoundException_IfFinalDestinationStatusIsNotFound() {
			when(finalDestinationStatusRepository.findByName(anyString())).thenReturn(Optional.empty());

			assertThrows(EntityNotFoundException.class, () -> underTest.getByName(anyString()));

			verify(finalDestinationStatusRepository, times(1)).findByName(anyString());
		}

		@Nested
		@DisplayName("getAllSelectOptions() unit tests")
		class GetAllSelectOptionsUnitTests {
			@Test
			@Description("Returns the correct list of StatusSelectOptionView records.")
			void shouldReturnAllStatusSelectOptionViews() {
				List<StatusSelectOption> expected = Collections.singletonList(mock(StatusSelectOption.class));
				when(finalDestinationStatusRepository.findAllByOrderByNameAsc()).thenReturn(expected);

				List<StatusSelectOption> actual = underTest.getAllSelectOptions();

				assertEquals(expected, actual);

				verify(finalDestinationStatusRepository, times(1)).findAllByOrderByNameAsc();
			}
		}
	}
}
