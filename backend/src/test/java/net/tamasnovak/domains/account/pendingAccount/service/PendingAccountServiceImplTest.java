package net.tamasnovak.domains.account.pendingAccount.service;

import net.tamasnovak.domains.account.account.service.AccountService;
import net.tamasnovak.domains.account.pendingAccount.models.dtoRequests.PendingAccountRegistrationDto;
import net.tamasnovak.domains.account.pendingAccount.models.entity.PendingAccount;
import net.tamasnovak.domains.account.pendingAccount.persistence.PendingAccountRepository;
import net.tamasnovak.domains.role.models.entity.Role;
import net.tamasnovak.domains.role.service.RoleService;
import net.tamasnovak.domains.support.institution.models.entity.Institution;
import net.tamasnovak.domains.support.institution.service.InstitutionService;
import net.tamasnovak.services.email.EmailService;
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

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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
  private EmailService emailService;

  @Mock
  private PendingAccountRepository pendingAccountRepository;

  @Mock
  private PendingAccountConstants pendingAccountConstants;

  @InjectMocks
  private PendingAccountServiceImpl underTest;

  private final String expectedValidEmail = "notexistingemail@test.net";

  @Nested
  @DisplayName("verifyAccountNotExistsByEmail() unit tests")
  class VerifyAccountNotExistsByEmailUnitTests {
    @Test
    @Description("Returns void if email is not found, i.e. the user can register with the provided email.")
    public void shouldReturnVoid_IfEmailIsNotFound() {
      when(pendingAccountRepository.existsByEmail(expectedValidEmail)).thenReturn(false);

      assertDoesNotThrow(() -> underTest.verifyAccountNotExistsByEmail(expectedValidEmail));

      verify(pendingAccountRepository, times(1)).existsByEmail(expectedValidEmail);
    }

    @Test
    @Description("Throws DataIntegrityViolationException if email is found, i.e. the user is not allowed to register with the provided email.")
    void shouldThrowDataIntegrityViolationException_IfEmailExists() {
      String notExpectedValidEmail = "existingemail@test.net";
      when(pendingAccountRepository.existsByEmail(notExpectedValidEmail)).thenReturn(true);

      assertThrows(DataIntegrityViolationException.class, () -> underTest.verifyAccountNotExistsByEmail(notExpectedValidEmail));

      verify(pendingAccountRepository, times(1)).existsByEmail(notExpectedValidEmail);
    }
  }

  @Nested
  @DisplayName("create() unit tests")
  class CreateUnitTests {
    @Test
    @Description("Saves a PendingAccount record with Student role and returns void.")
    void shouldSavePendingAccount_AndReturnVoid() {
      PendingAccountRegistrationDto requestBody = new PendingAccountRegistrationDto(
        "Student",
        "Test User",
        expectedValidEmail,
        UUID.randomUUID().toString(),
        UUID.randomUUID().toString()
      );

      Institution mockInstitution = mock(Institution.class);
      Role mockRole = Role.createRole("ROLE_TEST");
      when(institutionService.getByUuid(requestBody.institutionUuid())).thenReturn(mockInstitution);
      when(roleService.getRoleByUuid(requestBody.accountRoleUuid())).thenReturn(mockRole);

      PendingAccount expected = PendingAccount.createPendingAccount(
        requestBody.firstName(),
        requestBody.lastName(),
        requestBody.email(),
        mockInstitution,
        mockRole
      );

      underTest.create(requestBody);

      ArgumentCaptor<PendingAccount> argumentCaptor = ArgumentCaptor.forClass(PendingAccount.class);
      verify(pendingAccountRepository, times(1)).save(argumentCaptor.capture());
      PendingAccount actual = argumentCaptor.getValue();

      assertEquals(expected, actual);
    }
  }
}
