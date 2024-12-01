/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.application.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.application.application.persistence.ApplicationIdsView;
import net.tamasnovak.artifact.application.common.dto.ApplicationData;
import net.tamasnovak.artifact.application.common.entity.Application;
import net.tamasnovak.artifact.application.common.persistence.ApplicationRepository;
import net.tamasnovak.artifact.application.common.persistence.ApplicationView;
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
import static org.junit.jupiter.api.Assertions.assertNotNull;
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

  @InjectMocks
  private ApplicationServiceImpl underTest;

  private final UUID applicationUuid = UUID.randomUUID();

  @Nested
  @DisplayName("findApplicationByUuid() unit tests")
  class FindApplicationByUuidUnitTests {
    @Test
    @Description("Returns the expected Application record.")
    void shouldReturnApplication() {
      Application expected = mock(Application.class);
      when(applicationRepository.findApplicationByUuid(applicationUuid)).thenReturn(Optional.of(expected));

      Application actual = underTest.findApplicationByUuid(applicationUuid);

      assertEquals(expected, actual);
      verify(applicationRepository, times(1)).findApplicationByUuid(applicationUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if Application record is not found.")
    void shouldThrowEntityNotFoundException_IfApplicationIsNotFound() {
      when(authenticationFacade.getAuthenticatedAccount()).thenReturn(mock(Account.class));
      when(applicationRepository.findApplicationRelatedIdsByUuid(applicationUuid)).thenReturn(mock(ApplicationIdsView.class));
      when(applicationRepository.findApplicationViewByUuid(applicationUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.createApplicationData(applicationUuid));
      verify(applicationRepository, times(1)).findApplicationViewByUuid(applicationUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if UUID string is invalid.")
    void shouldThrowEntityNotFoundException_IfUuidStringIsInvalid() {
      when(authenticationFacade.getAuthenticatedAccount()).thenReturn(mock(Account.class));

      assertThrows(EntityNotFoundException.class, () -> underTest.createApplicationData(UUID.fromString("1234-1234-1234-1234-1234")));
    }

    @Test
    @Description("Throws IllegalArgumentException if UUID string is null.")
    void shouldThrowIllegalArgumentException_IfUuidStringIsNull() {
      assertThrows(IllegalArgumentException.class, () -> underTest.createApplicationData(null));
    }
  }

  @Nested
  @DisplayName("createApplicationData() unit tests")
  class CreateApplicationDataUnitTests {
    @Test
    @Description("Returns the expected ApplicationView instance.")
    void shouldReturnApplicationViewProjection() {
      Account mockAccount = mock(Account.class);
      ApplicationView mockApplicationView = mock(ApplicationView.class);
      ApplicationIdsView mockIdsView = mock(ApplicationIdsView.class);

      Instant now = Instant.now();
      when(mockApplicationView.getCreatedAt()).thenReturn(now);
      when(mockApplicationView.getLastUpdatedAt()).thenReturn(now);
      when(mockAccount.fetchRoleName()).thenReturn("ROLE_STUDENT");
      when(applicationRepository.findApplicationViewByUuid(applicationUuid)).thenReturn(Optional.of(mockApplicationView));
      when(authenticationFacade.getAuthenticatedAccount()).thenReturn(mockAccount);
      when(applicationRepository.findApplicationRelatedIdsByUuid(applicationUuid)).thenReturn(mockIdsView);

      ApplicationData actual = underTest.createApplicationData(applicationUuid);

      assertNotNull(actual);
      verify(applicationRepository, times(1)).findApplicationViewByUuid(applicationUuid);
      verify(authenticationFacade, times(1)).getAuthenticatedAccount();
      verify(applicationRepository, times(1)).findApplicationRelatedIdsByUuid(applicationUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if ApplicationView projection instance is not found.")
    void shouldThrowEntityNotFoundException_IfApplicationViewProjectionIsNotFound() {
      when(authenticationFacade.getAuthenticatedAccount()).thenReturn(mock(Account.class));
      when(applicationRepository.findApplicationViewByUuid(applicationUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.createApplicationData(applicationUuid));
      verify(applicationRepository, times(1)).findApplicationViewByUuid(applicationUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException if UUID string is invalid.")
    void shouldThrowEntityNotFoundException_IfUuidStringIsInvalid() {
      UUID invalidUuid = UUID.fromString("1234-1234-1234-1234-1234");
      when(authenticationFacade.getAuthenticatedAccount()).thenReturn(mock(Account.class));

      assertThrows(EntityNotFoundException.class, () -> underTest.createApplicationData(invalidUuid));
      verify(applicationRepository, times(1)).findApplicationViewByUuid(invalidUuid);
    }

    @Test
    @Description("Throws IllegalArgumentException if UUID string is null.")
    void shouldThrowIllegalArgumentException_IfUuidStringIsNull() {
      assertThrows(IllegalArgumentException.class, () -> underTest.createApplicationData(null));
    }
  }
}
