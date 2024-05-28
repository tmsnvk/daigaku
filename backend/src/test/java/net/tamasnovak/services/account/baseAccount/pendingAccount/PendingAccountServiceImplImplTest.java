package net.tamasnovak.services.account.baseAccount.pendingAccount;

import net.tamasnovak.dtos.account.request.PendingAccountRegistrationDto;
import net.tamasnovak.entities.account.PendingAccount;
import net.tamasnovak.entities.role.Role;
import net.tamasnovak.entities.support.institution.Institution;
import net.tamasnovak.repositories.account.baseAccount.PendingAccountRepository;
import net.tamasnovak.services.account.baseAccount.account.AccountService;
import net.tamasnovak.services.email.EmailService;
import net.tamasnovak.services.role.RoleService;
import net.tamasnovak.services.support.institution.InstitutionService;
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
class PendingAccountServiceImplImplTest {
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
  private PendingAccountServiceConstants pendingAccountConstants;

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
    @Description("Saves a PendingAccount record and returns void.")
    void shouldSavePendingAccount_AndReturnVoid() {
      PendingAccountRegistrationDto requestBody = new PendingAccountRegistrationDto(
        "Student",
        "Test User",
        expectedValidEmail,
        UUID.randomUUID().toString(),
        "STUDENT"
      );

      Institution mockInstitution = mock(Institution.class);
      Role mockRole = mock(Role.class);
      when(institutionService.getByUuid(requestBody.institutionUuid())).thenReturn(mockInstitution);
      when(roleService.getRoleByName(requestBody.accountType())).thenReturn(mockRole);

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
