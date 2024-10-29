package net.tamasnovak.artifact.account.pendingaccount.service;

import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.service.AccountService;
import net.tamasnovak.artifact.account.pendingaccount.dto.PendingAccountRegistration;
import net.tamasnovak.artifact.account.pendingaccount.entity.PendingAccount;
import net.tamasnovak.artifact.account.pendingaccount.persistence.PendingAccountRepository;
import net.tamasnovak.artifact.role.entity.Role;
import net.tamasnovak.artifact.role.service.RoleService;
import net.tamasnovak.artifact.support.institution.entity.Institution;
import net.tamasnovak.artifact.support.institution.service.InstitutionService;
import net.tamasnovak.rabbitmq.service.QueueSender;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Description;
import org.springframework.dao.DataIntegrityViolationException;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PendingAccountServiceImplTest {
  @Mock
  private AccountService accountService;

  @Mock
  private InstitutionService institutionService;

  @Mock
  private RoleService roleService;

  @Mock
  private QueueSender queueSender;

  @Mock
  private PendingAccountRepository pendingAccountRepository;

  @Mock
  private PendingAccountServiceConstants constants;

  @InjectMocks
  private PendingAccountServiceImpl underTest;

  private final String expectedValidEmail = "notexistingemail@test.net";
  private final String notExpectedValidEmail = "existingemail@test.net";

  @Nested
  @DisplayName("verifyAccountNotExistsByEmail() unit tests")
  class VerifyAccountNotExistsByEmailUnitTests {
    @Test
    @Description("Returns void when email is not found, i.e. the user can register with the provided email.")
    public void shouldReturnVoid_whenEmailIsNotFound() {
      when(pendingAccountRepository.existsByEmail(expectedValidEmail)).thenReturn(false);

      assertDoesNotThrow(() -> underTest.verifyAccountNotExistsByEmail(expectedValidEmail));

      verify(pendingAccountRepository, times(1)).existsByEmail(expectedValidEmail);
    }

    @Test
    @Description("Throws DataIntegrityViolationException when email is found, i.e. the user is not allowed to register with the provided email.")
    void shouldThrowDataIntegrityViolationException_whenEmailExists() {
      when(pendingAccountRepository.existsByEmail(notExpectedValidEmail)).thenReturn(true);

      assertThrows(DataIntegrityViolationException.class, () -> underTest.verifyAccountNotExistsByEmail(notExpectedValidEmail));

      verify(pendingAccountRepository, times(1)).existsByEmail(notExpectedValidEmail);
    }
  }

  @Nested
  @DisplayName("create() unit tests")
  class CreateUnitTests {
    PendingAccountRegistration invalidRequestBody = new PendingAccountRegistration(
      "Student",
      "Test User",
      notExpectedValidEmail,
      UUID.randomUUID()
          .toString(),
      UUID.randomUUID()
          .toString()
    );

    @Test
    @Description("Saves a PendingAccount record with Student role and returns void.")
    void shouldSavePendingAccount_andReturnVoid() {
      PendingAccountRegistration requestBody = new PendingAccountRegistration(
        "Student",
        "Test User",
        expectedValidEmail,
        UUID.randomUUID()
            .toString(),
        UUID.randomUUID()
            .toString()
      );

      Institution mockInstitution = mock(Institution.class);
      Role mockRole = Role.createRole("ROLE_TEST");
      when(institutionService.findByUuid(UUID.fromString(requestBody.institutionUuid()))).thenReturn(mockInstitution);
      when(roleService.findByUuid(UUID.fromString(requestBody.accountRoleUuid()))).thenReturn(mockRole);

      PendingAccount expected = PendingAccount.createPendingAccount(requestBody.firstName(), requestBody.lastName(), requestBody.email(), mockInstitution, mockRole);

      underTest.createPendingAccount(requestBody);

      ArgumentCaptor<PendingAccount> argumentCaptor = ArgumentCaptor.forClass(PendingAccount.class);
      verify(pendingAccountRepository, times(1)).save(argumentCaptor.capture());
      PendingAccount actual = argumentCaptor.getValue();

      assertEquals(expected, actual);
    }

    @Test
    @Description("Throws DataIntegrityViolationException when email is already registered in accounts table.")
    void shouldThrowDataIntegrityViolationException_whenEmailAlreadyExistsInAccountsTable() {
      doThrow(new DataIntegrityViolationException("Exception message.")).when(accountService)
                                                                        .checkAccountDoesNotExistByEmail(notExpectedValidEmail);

      assertThrows(DataIntegrityViolationException.class, () -> underTest.createPendingAccount(invalidRequestBody));

      verify(accountService, times(1)).checkAccountDoesNotExistByEmail(notExpectedValidEmail);
    }

    @Test
    @Description("Throws DataIntegrityViolationException when email is already registered in pending_accounts table.")
    void shouldThrowDataIntegrityViolationException_whenEmailAlreadyExistsInPendingAccountsTable() {
      doThrow(new DataIntegrityViolationException("Exception message.")).when(pendingAccountRepository)
                                                                        .existsByEmail(notExpectedValidEmail);

      assertThrows(DataIntegrityViolationException.class, () -> underTest.createPendingAccount(invalidRequestBody));

      verify(pendingAccountRepository, times(1)).existsByEmail(notExpectedValidEmail);
    }

    @Test
    @Description("Throws EntityNotFoundException when Institution instance is not found.")
    void shouldThrowEntityNotFoundException_whenInstitutionIsNotFound() {
      when(institutionService.findByUuid(UUID.fromString(invalidRequestBody.institutionUuid()))).thenThrow(new EntityNotFoundException("Exception message."));

      assertThrows(EntityNotFoundException.class, () -> underTest.createPendingAccount(invalidRequestBody));
    }

    @Test
    @Description("Throws EntityNotFoundException when Role instance is not found.")
    void shouldThrowEntityNotFoundException_whenRoleIsNotFound() {
      when(roleService.findByUuid(UUID.fromString(invalidRequestBody.accountRoleUuid()))).thenThrow(new EntityNotFoundException("Exception message."));

      assertThrows(EntityNotFoundException.class, () -> underTest.createPendingAccount(invalidRequestBody));
    }
  }
}
