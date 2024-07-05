package net.tamasnovak.domains.account.account.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.domains.account.account.models.dtoRequests.LoginRequestDto;
import net.tamasnovak.domains.account.account.models.dtoResponses.ClientAuthContextDto;
import net.tamasnovak.domains.account.account.models.dtoResponses.LoginReturnDto;
import net.tamasnovak.domains.account.account.models.entity.Account;
import net.tamasnovak.domains.account.account.persistence.AccountRepository;
import net.tamasnovak.domains.role.models.entity.Role;
import net.tamasnovak.domains.support.institution.models.entity.Institution;
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

import java.util.Optional;
import java.util.UUID;

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
  private AccountConstants accountConstants;

  @Mock
  private JwtUtilities jwtUtilities;

  @Mock
  private Authentication authentication;

  @InjectMocks
  private AccountServiceImpl underTest;

  private final String expectedValidEmail = "notexistingemail@test.net";
  private final String notValidEmail = "existingemail@test.net";
  private final String hashedPassword = "$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm";
  private final Institution mockInstitution = mock(Institution.class);
  private final Role mockRole = Role.createRole("STUDENT");
  private final Account mockAccount = Account.createAccount("Student", "Test User", expectedValidEmail, hashedPassword, mockInstitution, mockRole);

  @Nested
  @DisplayName("getByEmail() unit tests")
  class GetByEmailUnitTests {
    @Test
    @Description("Returns the correct Account record when corresponding email is found.")
    void shouldReturnAccountRecord_whenEmailIsFound() {
      Account expected = mock(Account.class);
      when(accountRepository.findByEmail(expectedValidEmail)).thenReturn(Optional.of(expected));

      Account actual = underTest.getByEmail(expectedValidEmail);

      assertEquals(expected, actual);

      verify(accountRepository, times(1)).findByEmail(expectedValidEmail);
    }

    @Test
    @Description("Throws EntityNotFoundException when email is not found.")
    void shouldThrowEntityNotFoundException_whenEmailIsNotFound() {
      String notExistingEmail = "notexistingemail@test.net";
      when(accountRepository.findByEmail(notExistingEmail)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.getByEmail(notExistingEmail));

      verify(accountRepository, times(1)).findByEmail(notExistingEmail);
    }
  }

  @Nested
  @DisplayName("getByUuid() unit tests")
  class GetByUuidUnitTests {
    UUID accountUuid = UUID.randomUUID();

    @Test
    @Description("Returns the correct Account record when corresponding UUID is found.")
    void shouldReturnAccountRecord_whenUuidIsFound() {
      Account expected = mock(Account.class);
      when(accountRepository.findByUuid(accountUuid)).thenReturn(Optional.of(expected));

      Account actual = underTest.getByUuid(accountUuid);

      assertEquals(expected, actual);

      verify(accountRepository, times(1)).findByUuid(accountUuid);
    }

    @Test
    @Description("Throws EntityNotFoundException when UUID is not found.")
    void shouldThrowEntityNotFoundException_whenUuidIsNotFound() {
      when(accountRepository.findByUuid(accountUuid)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.getByUuid(accountUuid));

      verify(accountRepository, times(1)).findByUuid(accountUuid);
    }
  }

  @Nested
  @DisplayName("getClientAuthContextDto() unit tests")
  class GetClientAuthContextDtoUnitTests {
    @Test
    @Description("Returns the correct ClientAuthContextDto instance when email is found.")
    void shouldReturnClientAuthContextDto_whenEmailIsFound() {
      ClientAuthContextDto expected = new ClientAuthContextDto(expectedValidEmail, mockAccount.getFirstName(), mockRole.getName());

      when(accountRepository.findByEmail(expectedValidEmail)).thenReturn(Optional.of(mockAccount));

      ClientAuthContextDto actual = underTest.getClientAuthContextDto(expectedValidEmail);

      assertEquals(expected, actual);

      verify(accountRepository, times(1)).findByEmail(expectedValidEmail);
    }

    @Test
    @Description("Propagates exception when accountService throws EntityNotFoundException.")
    void shouldPropagateException_whenAccountServiceThrowsEntityNotFoundException() {
      assertThrows(EntityNotFoundException.class, () -> underTest.getClientAuthContextDto(notValidEmail));
    }
  }

  @Nested
  @DisplayName("getLoginReturnDto() unit tests")
  class GetLoginReturnDtoUnitTests {
    @Test
    @Description("Returns the correct LoginReturnDto instance when valid requestBody dto and authentication instance are received.")
    void shouldReturnLoginReturnDto_whenRequestBodyDtoAndAuthenticationAreValid() {
      LoginRequestDto requestBody = new LoginRequestDto(expectedValidEmail, hashedPassword);
      String jwtToken = "generatedToken";

      LoginReturnDto expected = new LoginReturnDto(expectedValidEmail, mockAccount.getFirstName(), mockAccount.getRoleName(), jwtToken);
      when(accountRepository.findByEmail(expectedValidEmail)).thenReturn(Optional.of(mockAccount));
      when(jwtUtilities.generateJwtToken(authentication)).thenReturn(jwtToken);

      LoginReturnDto actual = underTest.getLoginReturnDto(requestBody, authentication);

      assertEquals(expected, actual);

      verify(accountRepository, times(1)).findByEmail(expectedValidEmail);
      verify(jwtUtilities, times(1)).generateJwtToken(authentication);
    }

    @Test
    @Description("Throws EntityNotFoundException when email is not found.")
    void shouldThrowEntityNotFoundException_whenEmailIsNotFound() {
      LoginRequestDto requestBody = new LoginRequestDto(notValidEmail, hashedPassword);

      when(accountRepository.findByEmail(notValidEmail)).thenReturn(Optional.empty());
      assertThrows(EntityNotFoundException.class, () -> underTest.getLoginReturnDto(requestBody, authentication));

      verify(accountRepository, times(1)).findByEmail(notValidEmail);
      verify(jwtUtilities, never()).generateJwtToken(authentication);
    }
  }

  @Nested
  @DisplayName("verifyAccountNotExistsByEmail() unit tests")
  class VerifyAccountNotExistsByEmailUnitTests {
    @Test
    @Description("Returns void when email is not found, i.e. the user can register with the provided email.")
    void shouldReturnVoid_whenEmailIsNotFound() {
      when(accountRepository.existsByEmail(expectedValidEmail)).thenReturn(false);

      assertDoesNotThrow(() -> underTest.verifyAccountNotExistsByEmail(expectedValidEmail));

      verify(accountRepository, times(1)).existsByEmail(expectedValidEmail);
    }

    @Test
    @Description("Throws DataIntegrityViolationException when email is found, i.e. the user is not allowed to register with the provided email.")
    void shouldThrowDataIntegrityViolationException_whenEmailExists() {
      when(accountRepository.existsByEmail(expectedValidEmail)).thenReturn(true);

      assertThrows(DataIntegrityViolationException.class, () -> underTest.verifyAccountNotExistsByEmail(expectedValidEmail));

      verify(accountRepository, times(1)).existsByEmail(expectedValidEmail);
    }
  }
}
