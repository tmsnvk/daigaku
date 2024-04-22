package net.tamasnovak.services.account.account;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.dtos.account.response.ClientAuthContextDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.role.Role;
import net.tamasnovak.repositories.account.AccountRepository;
import net.tamasnovak.security.utilities.JwtUtilities;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Description;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class AccountServiceImplTest {
  @Mock
  AccountRepository accountRepository;
  @Mock
  AccountConstants accountConstants;
  @Mock
  JwtUtilities jwtUtilities;
  AccountServiceImpl underTest;

  @BeforeEach
  public void setup() {
    underTest = new AccountServiceImpl(accountRepository, accountConstants, jwtUtilities);
  }

  @Test
  @DisplayName("checkIfExistsByEmail Test")
  @Description("Returns void if email is not found.")
  void shouldReturnVoidWhenEmailIsNotFound() {
    String notExistingEmail = "notexistingemail@test.net";

    underTest.checkIfExistsByEmail(notExistingEmail);
  }

  @Test
  @DisplayName("checkIfExistsByEmail Test")
  @Description("Throws DataIntegrityViolationException if email is found.")
  void shouldThrowDataIntegrityViolationExceptionIfEmailAlreadyExists() {
    String existingEmail = "alreadyexistingemail@test.net";

    Mockito.when(accountRepository.existsByEmail(existingEmail)).thenReturn(true);

    Assertions.assertThrows(DataIntegrityViolationException.class, () -> underTest.checkIfExistsByEmail(existingEmail));
  }

  @Test
  @DisplayName("findByEmail Test")
  @Description("Returns the correct Account object if corresponding email is found.")
  void shouldReturnCorrectAccountIfEmailIsFound() {
    String existingStudentEmail = "existingstudentemail@test.net";
    Account foundAccount = Account.createAccount(
      "Student",
      "Test User",
      existingStudentEmail,
      "hashedPassword",
      new Role("ROLE_STUDENT")
    );

    Mockito.when(accountRepository.findByEmail(existingStudentEmail)).thenReturn(Optional.of(foundAccount));
    Account account = underTest.findByEmail(existingStudentEmail);

    Assertions.assertEquals(foundAccount, account);
  }

  @Test
  @DisplayName("findByEmail Test")
  @Description("Throws EntityNotFoundException if email is not found.")
  void shouldThrowEntityNotFoundExceptionIfEmailIsNotFound() {
    String notExistingEmail = "notexistingemail@test.net";

    Mockito.when(accountRepository.findByEmail(notExistingEmail)).thenReturn(Optional.empty());

    Assertions.assertThrows(EntityNotFoundException.class, () -> underTest.findByEmail(notExistingEmail));
  }

  @Test
  @DisplayName("getClientAuthContextData Test")
  @Description("Returns the correct ClientAuthContextDto object if email is found.")
  void shouldReturnClientAuthContextDtoIfEmailIsFound() {
    String existingStudentEmail = "existingstudentemail@test.net";
    Role studentRole = new Role("ROLE_STUDENT");
    Account foundAccount = Account.createAccount(
      "Student",
      "Test User",
      existingStudentEmail,
      "hashedPassword",
      studentRole
    );
    ClientAuthContextDto expectedContextDto = new ClientAuthContextDto(
      existingStudentEmail,
      foundAccount.getFirstName(),
      studentRole.getName()
    );

    Mockito.when(accountRepository.findByEmail(existingStudentEmail)).thenReturn(Optional.of(foundAccount));
    ClientAuthContextDto actualContextDto = underTest.getClientAuthContextData(existingStudentEmail);

    Assertions.assertEquals(expectedContextDto, actualContextDto);
  }
}
