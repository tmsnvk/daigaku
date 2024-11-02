package net.tamasnovak.artifact.application.application.service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.application.application.persistence.ApplicationIdsView;
import net.tamasnovak.artifact.application.shared.dto.ApplicationData;
import net.tamasnovak.artifact.application.shared.persistence.ApplicationRepository;
import net.tamasnovak.artifact.application.shared.persistence.ApplicationView;
import net.tamasnovak.artifact.common.constants.GlobalServiceConstants;
import net.tamasnovak.security.authentication.facade.AuthenticationFacade;
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
class ApplicationServiceImplTest {
  @Mock
  private AuthenticationFacade authenticationFacade;

  @Mock
  private ApplicationRepository applicationRepository;

  @Mock
  private GlobalServiceConstants globalServiceConstants;

  @InjectMocks
  private ApplicationServiceImpl underTest;

  private final UUID applicationUuid = UUID.randomUUID();

  @Nested
  @DisplayName("getByUuid() unit tests")
  class GetByUuidUnitTests {
    @Test
    @Description("Returns the correct Application record.")
    void shouldReturnApplication() {
      net.tamasnovak.artifact.application.shared.entity.Application expected = mock(
        net.tamasnovak.artifact.application.shared.entity.Application.class);
      when(applicationRepository.findByUuid(applicationUuid)).thenReturn(Optional.of(expected));

      net.tamasnovak.artifact.application.shared.entity.Application actual = underTest.retrieveApplicationByUuid(applicationUuid);

      assertEquals(expected, actual);

      verify(applicationRepository, times(1)).findByUuid(applicationUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if Application record is not found.")
    void shouldThrowEntityNotFoundException_IfApplicationIsNotFound() {
      when(applicationRepository.findByUuid(applicationUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.retrieveApplicationByUuid(applicationUuid));

      verify(applicationRepository, times(1)).findByUuid(applicationUuid);
    }

    @Test
    @Description("Throws IllegalArgumentException if UUID string is invalid.")
    void shouldThrowIllegalArgumentException_IfUuidStringIsInvalid() {
      assertThrows(IllegalArgumentException.class, () -> underTest.retrieveApplicationByUuid(null));
    }

    @Test
    @Description("Throws NullPointerException if UUID string is null.")
    void shouldThrowNullPointerException_IfUuidStringIsNull() {
      assertThrows(NullPointerException.class, () -> underTest.retrieveApplicationByUuid(null));
    }
  }

  @Nested
  @DisplayName("getApplicationDtoByUuid() unit tests")
  class GetApplicationDataByUuidUnitTests {
    @Test
    @Description("Returns the correct ApplicationDto instance.")
    void shouldReturnApplicationViewProjection() {
      Account mockAccount = mock(Account.class);
      ApplicationView mockApplicationView = mock(ApplicationView.class);

      Instant now = Instant.now();
      when(mockApplicationView.getCreatedAt()).thenReturn(now);
      when(mockApplicationView.getLastUpdatedAt()).thenReturn(now);

      ApplicationData expected = new ApplicationData(null, null, null, null, null, null, 0, null, null, null, null, null,
        Timestamp.from(now), Timestamp.from(now), null, null, false);

      when(mockAccount.retrieveRoleName()).thenReturn("ROLE_STUDENT");

      when(applicationRepository.findApplicationViewByUuid(applicationUuid)).thenReturn(Optional.of(mockApplicationView));
      when(authenticationFacade.getAuthenticatedAccount()).thenReturn(mockAccount);
      when(applicationRepository.findApplicationRelatedIdsByUuid(applicationUuid)).thenReturn(mock(ApplicationIdsView.class));

      ApplicationData actual = underTest.createApplicationDataByUuid(applicationUuid);

      assertEquals(expected, actual);

      verify(applicationRepository, times(1)).findApplicationViewByUuid(applicationUuid);
      verify(authenticationFacade, times(1)).getAuthenticatedAccount();
      verify(applicationRepository, times(1)).findApplicationRelatedIdsByUuid(applicationUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if ApplicationView projection instance is not found.")
    void shouldThrowEntityNotFoundException_IfApplicationViewProjectionIsNotFound() {
      when(applicationRepository.findApplicationViewByUuid(applicationUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.createApplicationDataByUuid(applicationUuid));

      verify(applicationRepository, times(1)).findApplicationViewByUuid(applicationUuid);
    }

    @Test
    @Description("Throws IllegalArgumentException if UUID string is invalid.")
    void shouldThrowIllegalArgumentException_IfUuidStringIsInvalid() {
      assertThrows(IllegalArgumentException.class, () -> underTest.createApplicationDataByUuid(null));
    }

    @Test
    @Description("Throws NullPointerException if UUID string is null.")
    void shouldThrowNullPointerException_IfUuidStringIsNull() {
      assertThrows(NullPointerException.class, () -> underTest.createApplicationDataByUuid(null));
    }
  }
}
