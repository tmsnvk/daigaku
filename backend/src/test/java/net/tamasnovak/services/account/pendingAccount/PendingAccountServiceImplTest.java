package net.tamasnovak.services.account.pendingAccount;

import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.entities.account.baseAccount.PendingAccount;
import net.tamasnovak.entities.institution.Institution;
import net.tamasnovak.entities.role.Role;
import net.tamasnovak.repositories.account.PendingAccountRepository;
import net.tamasnovak.services.account.account.AccountService;
import net.tamasnovak.services.email.EmailService;
import net.tamasnovak.services.institution.InstitutionService;
import net.tamasnovak.services.role.RoleService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Description;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.UUID;

@ExtendWith(MockitoExtension.class)
class PendingAccountServiceImplTest {
  @Mock
  private AccountService accountService;
  @Mock
  private InstitutionService institutionService;
  @Mock
  private RoleService roleService;
  @Mock
  private EmailService emailService;
  @Mock
  private PendingAccountRepository pendingAccountRepository;
  @Mock
  private PendingAccountConstants pendingAccountConstants;
  @InjectMocks
  private PendingAccountServiceImpl underTest;

  @Nested
  @DisplayName("verifyAccountNotExistsByEmail() method tests")
  class VerifyAccountNotExistsByEmailMethodTests {
    @Test
    @Description("""
      action: Returns void if email is not found.
      assertion: Does not throw DataIntegrityViolationException.
    """)
    public void shouldReturnVoid_IfEmailIsNotFound() {
      String notExistingEmail = "notexistingemail@test.net";

      Mockito.when(pendingAccountRepository.existsByEmail(notExistingEmail)).thenReturn(false);

      Assertions.assertDoesNotThrow(() -> underTest.verifyAccountNotExistsByEmail(notExistingEmail));

      Mockito.verify(pendingAccountRepository, Mockito.times(1)).existsByEmail(notExistingEmail);
    }

    @Test
    @Description("""
      action: Throws DataIntegrityViolationException if email is found.
      assertion: Does throw DataIntegrityViolationException.
    """)
    public void shouldThrowDataIntegrityViolationException_IfEmailAlreadyExists() {
      String existingEmail = "existingemail@test.net";

      Mockito.when(pendingAccountRepository.existsByEmail(existingEmail)).thenReturn(true);

      Assertions.assertThrows(DataIntegrityViolationException.class, () -> underTest.verifyAccountNotExistsByEmail(existingEmail));

      Mockito.verify(pendingAccountRepository, Mockito.times(1)).existsByEmail(existingEmail);
    }
  }

  @Nested
  @DisplayName("createAccount() method tests")
  class CreateAccountMethodTests {
    @Test
    @Description("""
      action: Saves a PendingAccount instance and returns void if no exceptions were thrown.
      assertion: The expected and actual PendingAccount instances are equal.
    """)
    public void shouldSavePendingAccount_andReturnVoid_ifNoExceptionsWereThrown() {
      PendingAccountRegistrationDto requestBody = new PendingAccountRegistrationDto(
        "Student",
        "Test User",
        "student@test.net",
        UUID.randomUUID().toString(),
        "STUDENT"
      );

      Institution mockInstitution = Mockito.mock(Institution.class);
      Role mockRole = Mockito.mock(Role.class);

      PendingAccount expected = PendingAccount.createPendingAccount(
        requestBody.firstName(),
        requestBody.lastName(),
        requestBody.email(),
        mockInstitution,
        mockRole
      );

      Mockito.when(institutionService.getInstitutionByUuid(requestBody.institutionUuid())).thenReturn(mockInstitution);
      Mockito.when(roleService.getRoleByName(requestBody.accountType())).thenReturn(mockRole);

      underTest.createAccount(requestBody);
      ArgumentCaptor<PendingAccount> argumentCaptor = ArgumentCaptor.forClass(PendingAccount.class);

      underTest.verifyAccountNotExistsByEmail(requestBody.email());
      Mockito.verify(accountService, Mockito.times(1)).verifyAccountNotExistsByEmail(requestBody.email());
      Mockito.verify(pendingAccountRepository, Mockito.times(1)).save(argumentCaptor.capture());

      PendingAccount actual = argumentCaptor.getValue();

      Assertions.assertEquals(expected, actual);
    }
  }
}
