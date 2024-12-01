/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.account.account.service;

import java.util.Optional;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.dto.AuthContextResponse;
import net.tamasnovak.artifact.account.account.dto.LoginRequest;
import net.tamasnovak.artifact.account.account.dto.LoginResponse;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.account.account.persistence.AccountRepository;
import net.tamasnovak.artifact.role.entity.Role;
import net.tamasnovak.artifact.support.institution.entity.Institution;
import net.tamasnovak.security.utilities.JwtUtilities;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Description;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AccountServiceImplTest {
  @Mock
  private AccountRepository accountRepository;

  @Mock
  private JwtUtilities jwtUtilities;

  @Mock
  private Authentication authentication;

  @InjectMocks
  private AccountServiceImpl underTest;

  private final String expectedValidEmail = "expectedvalidemail@test.net";
  private final String notValidEmail = "notvalidemail@test.net";
  private final String hashedPassword = "$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm";
  private final Institution mockInstitution = mock(Institution.class);
  private final Role mockRole = mock(Role.class);
  private final Account mockAccount = Account.createAccount("Student", "Test User", expectedValidEmail, hashedPassword, mockInstitution,
    mockRole);

  @Nested
  @DisplayName("findAccountByEmail() unit tests")
  class FindAccountByEmailUnitTests {
    @Test
    @Description("Returns the correct Account record when corresponding email is found.")
    void shouldReturnAccountRecord_whenEmailIsFound() {
      Account expected = mock(Account.class);

      when(accountRepository.findAccountByEmail(expectedValidEmail)).thenReturn(Optional.of(expected));
      Account actual = underTest.findAccountByEmail(expectedValidEmail);

      assertEquals(expected, actual);
      verify(accountRepository, times(1)).findAccountByEmail(expectedValidEmail);
    }

    @Test
    @Description("Throws EntityNotFoundException when email is not found.")
    void shouldThrowEntityNotFoundException_whenEmailIsNotFound() {
      when(accountRepository.findAccountByEmail(notValidEmail)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findAccountByEmail(notValidEmail));
      verify(accountRepository, times(1)).findAccountByEmail(notValidEmail);
    }
  }

  @Nested
  @DisplayName("findAccountByUuid() unit tests")
  class FindAccountByUuidUnitTests {
    UUID accountUuid = UUID.randomUUID();

    @Test
    @Description("Returns the correct Account record when corresponding uuid is found.")
    void shouldReturnAccountRecord_whenUuidIsFound() {
      Account expected = mock(Account.class);

      when(accountRepository.findAccountByUuid(accountUuid)).thenReturn(Optional.of(expected));
      Account actual = underTest.findAccountByUuid(accountUuid);

      assertEquals(expected, actual);
      verify(accountRepository, times(1)).findAccountByUuid(accountUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException when uuid is not found.")
    void shouldThrowEntityNotFoundException_whenUuidIsNotFound() {
      when(accountRepository.findAccountByUuid(accountUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.findAccountByUuid(accountUuid));
      verify(accountRepository, times(1)).findAccountByUuid(accountUuid);
    }
  }

  @Nested
  @DisplayName("fetchAuthContextResponse() unit tests")
  class FetchAuthContextResponseUnitTests {
    @Test
    @Description("Returns the correct AuthContextResponse instance when email is found.")
    void shouldReturnClientAuthContextResponse_whenEmailIsFound() {
      when(mockRole.getName()).thenReturn("STUDENT");
      AuthContextResponse expected = new AuthContextResponse(expectedValidEmail, mockAccount.getFirstName(), mockRole.getName());

      when(accountRepository.findAccountByEmail(expectedValidEmail)).thenReturn(Optional.of(mockAccount));
      AuthContextResponse actual = underTest.fetchAuthContextResponse(expectedValidEmail);

      assertEquals(expected, actual);
      verify(accountRepository, times(1)).findAccountByEmail(expectedValidEmail);
    }

    @Test
    @Description("Propagates exception throw when accountService throws EntityNotFoundException.")
    void shouldPropagateExceptionThrow_whenAccountServiceThrowsEntityNotFoundException() {
      assertThrows(EntityNotFoundException.class, () -> underTest.fetchAuthContextResponse(notValidEmail));
    }
  }

  @Nested
  @DisplayName("fetchLoginResponse() unit tests")
  class FetchLoginResponseUnitTests {
    @Test
    @Description("Returns the correct LoginResponse instance when valid requestBody and authentication instances are received.")
    void shouldReturnLoginResponse_whenRequestBodyAndAuthenticationAreValid() {
      LoginRequest requestBody = new LoginRequest(expectedValidEmail, hashedPassword);
      String jwtToken = "generatedToken";
      LoginResponse expected = new LoginResponse(expectedValidEmail, mockAccount.getFirstName(), mockAccount.fetchRoleName(), jwtToken);

      when(accountRepository.findAccountByEmail(expectedValidEmail)).thenReturn(Optional.of(mockAccount));
      when(jwtUtilities.generateJwtToken(authentication)).thenReturn(jwtToken);
      LoginResponse actual = underTest.fetchLoginResponse(requestBody, authentication);

      assertEquals(expected, actual);
      verify(accountRepository, times(1)).findAccountByEmail(expectedValidEmail);
      verify(jwtUtilities, times(1)).generateJwtToken(authentication);
    }

    @Test
    @Description("Propagates exception throw when accountService throws EntityNotFoundException.")
    void shouldPropagateExceptionThrow_whenAccountServiceThrowsEntityNotFoundException() {
      LoginRequest requestBody = new LoginRequest(notValidEmail, hashedPassword);

      when(accountRepository.findAccountByEmail(notValidEmail)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.fetchLoginResponse(requestBody, authentication));
      verify(accountRepository, times(1)).findAccountByEmail(notValidEmail);
      verify(jwtUtilities, never()).generateJwtToken(authentication);
    }
  }

  @Nested
  @DisplayName("validateAccountDoesNotExist() unit tests")
  class ValidateAccountDoesNotExistUnitTests {
    @Test
    @Description("Returns void when email is not found, i.e. the user can register with the provided email.")
    void shouldReturnVoid_whenEmailIsNotFound() {
      when(accountRepository.existsAccountByEmail(expectedValidEmail)).thenReturn(false);

      assertDoesNotThrow(() -> underTest.validateAccountDoesNotExist(expectedValidEmail));
      verify(accountRepository, times(1)).existsAccountByEmail(expectedValidEmail);
    }

    @Test
    @Description("Throws DataIntegrityViolationException when email is found, i.e. the user is cannot to register with the provided email.")
    void shouldThrowDataIntegrityViolationException_whenEmailExists() {
      when(accountRepository.existsAccountByEmail(expectedValidEmail)).thenReturn(true);

      assertThrows(DataIntegrityViolationException.class, () -> underTest.validateAccountDoesNotExist(expectedValidEmail));
      verify(accountRepository, times(1)).existsAccountByEmail(expectedValidEmail);
    }
  }
}
