package net.tamasnovak.services.account.account;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.account.request.LoginRequestDto;
import net.tamasnovak.dtos.account.response.ClientAuthContextDto;
import net.tamasnovak.dtos.account.response.LoginReturnDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.institution.Institution;
import net.tamasnovak.entities.role.Role;
import net.tamasnovak.repositories.account.AccountRepository;
import net.tamasnovak.security.utilities.JwtUtilities;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Description;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;

import java.util.Optional;

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
  private AccountService underTest;

  @BeforeEach
  public void setup() {
    underTest = new AccountServiceImpl(accountRepository, accountConstants, jwtUtilities);
  }

  @Nested
  @DisplayName("checkIfExistsByEmail() method tests")
  class CheckIfExistsByEmailMethodTests {
    @Test
    @Description("Returns void if email is not found.")
    public void shouldReturnVoid_IfEmailIsNotFound() {
      String notExistingEmail = "notexistingemail@test.net";

      Mockito.when(accountRepository.existsByEmail(notExistingEmail)).thenReturn(false);
      Assertions.assertDoesNotThrow(() -> underTest.checkIfExistsByEmail(notExistingEmail));

      Mockito.verify(accountRepository, Mockito.times(1)).existsByEmail(notExistingEmail);
    }

    @Test
    @Description("Throws DataIntegrityViolationException if email is found.")
    public void shouldThrowDataIntegrityViolationException_IfEmailAlreadyExists() {
      String existingEmail = "existingemail@test.net";

      Mockito.when(accountRepository.existsByEmail(existingEmail)).thenReturn(true);
      Assertions.assertThrows(DataIntegrityViolationException.class, () -> underTest.checkIfExistsByEmail(existingEmail));

      Mockito.verify(accountRepository, Mockito.times(1)).existsByEmail(existingEmail);
    }
  }

  @Nested
  @DisplayName("findByEmail() method tests")
  class FindByEmailMethodTests {
    @Test
    @Description("Returns the correct Account object if corresponding email is found.")
    public void shouldReturnCorrectAccount_IfEmailIsFound() {
      String existingStudentEmail = "existingstudentemail@test.net";
      Account expected = Account.createAccount(
        "Student",
        "Test User",
        existingStudentEmail,
        "hashedPassword",
        new Institution("Test Institution"),
        new Role("ROLE_STUDENT")
      );

      Mockito.when(accountRepository.findByEmail(existingStudentEmail)).thenReturn(Optional.of(expected));
      Account actual = underTest.findByEmail(existingStudentEmail);

      Assertions.assertEquals(expected, actual);
    }

    @Test
    @Description("Throws EntityNotFoundException if email is not found.")
    void shouldThrowEntityNotFoundException_IfEmailIsNotFound() {
      String notExistingEmail = "notexistingemail@test.net";

      Mockito.when(accountRepository.findByEmail(notExistingEmail)).thenReturn(Optional.empty());

      Assertions.assertThrows(EntityNotFoundException.class, () -> underTest.findByEmail(notExistingEmail));
    }
  }

  @Nested
  @DisplayName("getClientAuthContextData() method tests")
  class GetClientAuthContextDataMethodTests {
    @Test
    @Description("Returns the correct ClientAuthContextDto object if email is found.")
    public void shouldReturnClientAuthContextDto_IfEmailIsFound() {
      String existingStudentEmail = "existingstudentemail@test.net";
      Role studentRole = new Role("ROLE_STUDENT");
      Account foundAccount = Account.createAccount(
        "Student",
        "Test User",
        existingStudentEmail,
        "hashedPassword",
        new Institution("Test Institution"),
        studentRole
      );
      ClientAuthContextDto expected = new ClientAuthContextDto(existingStudentEmail, foundAccount.getFirstName(), studentRole.getName());

      Mockito.when(accountRepository.findByEmail(existingStudentEmail)).thenReturn(Optional.of(foundAccount));
      ClientAuthContextDto actual = underTest.getClientAuthContextData(existingStudentEmail);

      Assertions.assertEquals(expected, actual);
    }
  }

  @Nested
  @DisplayName("getLoginData() method tests")
  class GetLoginDataMethodTests {
    @Test
    @Description("Returns the correct LoginReturnDto object if email is found.")
    public void shouldReturnLoginReturnDto_IfEmailIsFound() {
      String existingStudentEmail = "existingstudentemail@test.net";
      String hashedPassword = "hashedPassword";
      LoginRequestDto loginRequestDto = new LoginRequestDto(existingStudentEmail, hashedPassword);

      Role studentRole = new Role("ROLE_STUDENT");
      Account foundAccount = Account.createAccount(
        "Student",
        "Test User",
        existingStudentEmail,
        hashedPassword,
        new Institution("Test Institution"),
        studentRole
      );
      String jwtToken = "generatedToken";
      LoginReturnDto expected = new LoginReturnDto(
        existingStudentEmail,
        foundAccount.getFirstName(),
        foundAccount.getRole().getName(),
        jwtToken
      );

      Mockito.when(accountRepository.findByEmail(existingStudentEmail)).thenReturn(Optional.of(foundAccount));
      Mockito.when(jwtUtilities.generateJwtToken(authentication)).thenReturn(jwtToken);
      LoginReturnDto actual = underTest.getLoginData(loginRequestDto, authentication);

      Assertions.assertEquals(expected, actual);
    }
  }
}
