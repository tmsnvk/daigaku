package net.tamasnovak.services.account.baseAccount.account;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.account.request.LoginRequestDto;
import net.tamasnovak.dtos.account.response.ClientAuthContextDto;
import net.tamasnovak.dtos.account.response.LoginReturnDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.institution.Institution;
import net.tamasnovak.entities.role.Role;
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
  private AccountConstants accountConstants;
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
  private final Account foundAccount = Account.createAccount("Student", "Test User", expectedValidEmail, hashedPassword, mockInstitution, mockRole);

  @Nested
  @DisplayName("verifyAccountNotExistsByEmail() unit tests")
  class VerifyAccountNotExistsByEmailUnitTests {
    @Test
    @Description("Returns void if email is not found, i.e. the user can register with the provided email.")
    public void shouldReturnVoid_IfEmailIsNotFound() {
      when(accountRepository.existsByEmail(expectedValidEmail)).thenReturn(false);
      assertDoesNotThrow(() -> underTest.verifyAccountNotExistsByEmail(expectedValidEmail));

      verify(accountRepository, times(1)).existsByEmail(expectedValidEmail);
    }

    @Test
    @Description("Throws DataIntegrityViolationException if email is found, i.e. the user is not allowed to register with the provided email.")
    public void shouldThrowDataIntegrityViolationException_IfEmailAlreadyExists() {
      when(accountRepository.existsByEmail(expectedValidEmail)).thenReturn(true);
      assertThrows(DataIntegrityViolationException.class, () -> underTest.verifyAccountNotExistsByEmail(expectedValidEmail));

      verify(accountRepository, times(1)).existsByEmail(expectedValidEmail);
    }
  }

  @Nested
  @DisplayName("getAccountByEmail() unit tests")
  class GetAccountByEmailUnitTests {
    @Test
    @Description("Returns the correct Account instance if corresponding email is found.")
    public void shouldReturnCorrectAccount_IfEmailIsFound() {
      Account expected = Account.createAccount("Student", "Test User", expectedValidEmail, hashedPassword, mockInstitution, mockRole);

      when(accountRepository.findByEmail(expectedValidEmail)).thenReturn(Optional.of(expected));
      Account actual = underTest.getAccountByEmail(expectedValidEmail);

      assertEquals(expected, actual);
    }

    @Test
    @Description("Throws EntityNotFoundException if email is not found.")
    void shouldThrowEntityNotFoundException_IfEmailIsNotFound() {
      String notExistingEmail = "notexistingemail@test.net";

      when(accountRepository.findByEmail(notExistingEmail)).thenReturn(Optional.empty());

      assertThrows(EntityNotFoundException.class, () -> underTest.getAccountByEmail(notExistingEmail));
    }
  }

  @Nested
  @DisplayName("getClientAuthContextDto() unit tests")
  class GetClientAuthContextDtoUnitTests {
    @Test
    @Description("Returns the correct ClientAuthContextDto instance if email is found.")
    public void shouldReturnClientAuthContextDto_IfEmailIsFound() {
      ClientAuthContextDto expected = new ClientAuthContextDto(expectedValidEmail, foundAccount.getFirstName(), mockRole.getName());

      when(accountRepository.findByEmail(expectedValidEmail)).thenReturn(Optional.of(foundAccount));
      ClientAuthContextDto actual = underTest.getClientAuthContextDto(expectedValidEmail);

      assertEquals(expected, actual);
    }
  }

  @Nested
  @DisplayName("getLoginReturnDto() unit tests")
  class GetLoginReturnDtoUnitTests {
    @Test
    @Description("Returns the correct LoginReturnDto instance if email is found.")
    public void shouldReturnLoginReturnDto_IfEmailIsFound() {
      LoginRequestDto requestBody = new LoginRequestDto(expectedValidEmail, hashedPassword);

      String jwtToken = "generatedToken";
      LoginReturnDto expected = new LoginReturnDto(expectedValidEmail, foundAccount.getFirstName(), foundAccount.getRole().getName(), jwtToken);

      when(accountRepository.findByEmail(expectedValidEmail)).thenReturn(Optional.of(foundAccount));
      when(jwtUtilities.generateJwtToken(authentication)).thenReturn(jwtToken);
      LoginReturnDto actual = underTest.getLoginReturnDto(requestBody, authentication);

      assertEquals(expected, actual);
    }
  }
}
