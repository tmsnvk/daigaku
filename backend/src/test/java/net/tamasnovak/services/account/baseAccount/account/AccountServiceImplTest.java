package net.tamasnovak.services.account.baseAccount.account;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.account.request.LoginRequestDto;
import net.tamasnovak.dtos.account.response.ClientAuthContextDto;
import net.tamasnovak.dtos.account.response.LoginReturnDto;
import net.tamasnovak.entities.account.Account;
import net.tamasnovak.entities.role.Role;
import net.tamasnovak.entities.support.institution.Institution;
import net.tamasnovak.repositories.account.baseAccount.AccountRepository;
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

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AccountServiceImplTest {
  @Mock
  private AccountRepository accountRepository;

  @Mock
  private AccountServiceConstants accountServiceConstants;

  @Mock
  private JwtUtilities jwtUtilities;

  @Mock
  private Authentication authentication;

  @InjectMocks
  private AccountServiceImpl underTest;

  private final String expectedValidEmail = "notexistingemail@test.net";
  private final String hashedPassword = "$2a$10$4s.G7boZLt0RVvlQkl9RJuSbXF3XAol8zdriS9bqyrzUK0/tsJGhm";
  private final Institution mockInstitution = mock(Institution.class);
  private final Role mockRole = mock(Role.class);
  private final Account account = Account.createAccount("Student", "Test User", expectedValidEmail, hashedPassword, mockInstitution, mockRole);

  @Nested
  @DisplayName("getByEmail() unit tests")
  class GetByEmailUnitTests {
    @Test
    @Description("Returns the correct Account record if corresponding email is found.")
    void shouldReturnAccountRecord() {
      Account expected = mock(Account.class);
      when(accountRepository.findByEmail(expectedValidEmail)).thenReturn(Optional.of(expected));

      Account actual = underTest.getByEmail(expectedValidEmail);

      assertEquals(expected, actual);

      verify(accountRepository, times(1)).findByEmail(expectedValidEmail);
    }

    @Test
    @Description("Throws EntityNotFoundException if email is not found.")
    void shouldThrowEntityNotFoundException_IfEmailIsNotFound() {
      String notExistingEmail = "notexistingemail@test.net";
      when(accountRepository.findByEmail(notExistingEmail)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.getByEmail(notExistingEmail));

      verify(accountRepository, times(1)).findByEmail(notExistingEmail);
    }
  }

  @Nested
  @DisplayName("getClientAuthContextDto() unit tests")
  class GetClientAuthContextDtoUnitTests {
    @Test
    @Description("Returns the correct ClientAuthContextDto instance if email is found.")
    void shouldReturnClientAuthContextDto_IfEmailIsFound() {
      ClientAuthContextDto expected = new ClientAuthContextDto(expectedValidEmail, account.getFirstName(), mockRole.getName());
      when(accountRepository.findByEmail(expectedValidEmail)).thenReturn(Optional.of(account));

      ClientAuthContextDto actual = underTest.getClientAuthContextDto(expectedValidEmail);

      assertEquals(expected, actual);

      verify(accountRepository, times(1)).findByEmail(expectedValidEmail);
    }
  }

  @Nested
  @DisplayName("getLoginReturnDto() unit tests")
  class GetLoginReturnDtoUnitTests {
    @Test
    @Description("Returns the correct LoginReturnDto instance if valid requestBody dto and authentication instance are received.")
    void shouldReturnLoginReturnDto_IfRequestBodyDtoIsValid() {
      LoginRequestDto requestBody = new LoginRequestDto(expectedValidEmail, hashedPassword);
      String jwtToken = "generatedToken";

      LoginReturnDto expected = new LoginReturnDto(expectedValidEmail, account.getFirstName(), account.getRole().getName(), jwtToken);
      when(accountRepository.findByEmail(expectedValidEmail)).thenReturn(Optional.of(account));
      when(jwtUtilities.generateJwtToken(authentication)).thenReturn(jwtToken);

      LoginReturnDto actual = underTest.getLoginReturnDto(requestBody, authentication);

      assertEquals(expected, actual);

      verify(accountRepository, times(1)).findByEmail(expectedValidEmail);
      verify(jwtUtilities, times(1)).generateJwtToken(authentication);
    }
    @Test
    @Description("Throws EntityNotFoundException if email is not found.")
    void shouldThrowEntityNotFoundException_IfEmailIsNotFound() {
      String notExistingEmail = "notexistingemail@test.net";
      LoginRequestDto requestBody = new LoginRequestDto(notExistingEmail, hashedPassword);

      when(accountRepository.findByEmail(notExistingEmail)).thenReturn(Optional.empty());
      assertThrows(EntityNotFoundException.class, () -> underTest.getLoginReturnDto(requestBody, authentication));

      verify(accountRepository, times(1)).findByEmail(notExistingEmail);
    }
  }

  @Nested
  @DisplayName("verifyAccountNotExistsByEmail() unit tests")
  class VerifyAccountNotExistsByEmailUnitTests {
    @Test
    @Description("Returns void if email is not found, i.e. the user can register with the provided email.")
    void shouldReturnVoid_IfEmailIsNotFound() {
      when(accountRepository.existsByEmail(expectedValidEmail)).thenReturn(false);

      assertDoesNotThrow(() -> underTest.verifyAccountNotExistsByEmail(expectedValidEmail));

      verify(accountRepository, times(1)).existsByEmail(expectedValidEmail);
    }

    @Test
    @Description("Throws DataIntegrityViolationException if email is found, i.e. the user is not allowed to register with the provided email.")
    void shouldThrowDataIntegrityViolationException_IfEmailExists() {
      when(accountRepository.existsByEmail(expectedValidEmail)).thenReturn(true);

      assertThrows(DataIntegrityViolationException.class, () -> underTest.verifyAccountNotExistsByEmail(expectedValidEmail));

      verify(accountRepository, times(1)).existsByEmail(expectedValidEmail);
    }
  }
}
